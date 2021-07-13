import { FunctionComponent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FoldingCube } from 'better-react-spinkit'
import ProgressBar from '@ramonak/react-progress-bar'

type Props = {}

const Songs: FunctionComponent<Props> = () => {
  const { query, push } = useRouter()
  const [code, setCode] = useState(null)
  const [songs, setSongs] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [progress, setProgress] = useState(1)
  const [error, setError] = useState('')
  const [tokens, setTokens] = useState<{
    accessToken: string
    refreshToken: string
    expiresIn: number
  } | null>(null)

  useEffect(() => {
    setProgress(
      songs.length === 0 ? 1 : Math.round((songs.length / total) * 100)
    )
  }, [songs, total])

  useEffect(() => {
    if (tokens?.accessToken && progress < 100) {
      fetch(
        `/api/spotify/songs?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}&page=${page}`
      )
        .then((r) => r.json())
        .then((results) => {
          if (results.songs) {
            setSongs([...songs, ...results.songs])
            setTotal(results.total)
            setPage(page + 1)
          }
        })
        .catch((err) => {
          console.error(err)
          setError('Something went wrong')
        })
    }
  }, [tokens, page])

  useEffect(() => {
    if (query.code) {
      setCode(query.code)
    }
  }, [query])

  useEffect(() => {
    if (code) {
      fetch(`/api/spotify/tokens?code=${code}`)
        .then((r) => r.json())
        .then((results) => {
          if (results.error) {
            push('/')
          } else {
            setTokens(results)
          }
        })
    }
  }, [code])

  if (error) {
    return (
      <div>
        <div className="text-xl text-center text-danger">{error}</div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="my-4 text-xl">
        Loaded {songs.length} songs of {total}
      </h2>
      {progress < 100 && (
        <ProgressBar
          completed={progress}
          height="40px"
          bgColor="var(--color-accent)"
          baseBgColor="var(--color-bgDim)"
          labelAlignment="outside"
          labelColor="var(--color-fg)"
        />
      )}
      <ul className="mt-8">
        {songs.map((song) => (
          <a
            key={song.id}
            href={`https://youtube.com/watch?v=${song.youtubeVideoId}`}
            className="hover:font-bold"
          >
            <li className="flex flex-wrap items-center">
              <div className="mr-2 text-sm">
                {song.artists?.map((a) => a.name).join(', ')}
              </div>
              <div className="text-lg font-semibold text-accent">
                {song.name}
              </div>
            </li>
          </a>
        ))}
      </ul>
      {(songs.length === 0 || songs.length < total) && (
        <FoldingCube size={100} color="var(--color-accent)" className="mt-5" />
      )}
    </div>
  )
}

export default Songs
