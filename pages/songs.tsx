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
          baseBgColor="var(--color-bg)"
          labelAlignment="outside"
          labelColor="var(--color-fg)"
          className="pr-2 shadow-md rounded-2xl"
          borderRadius="16px"
        />
      )}
      <ul className="mt-8">
        {songs.map((song) => (
          <a
            key={song.id}
            href={`https://youtube.com/watch?v=${song.youtubeVideoId}`}
            className="block p-2 my-2 transition-colors border rounded-md shadow-md group hover:bg-accent bg-bgDim"
          >
            <li className="flex flex-wrap items-center">
              <div className="mr-2 text-sm group-hover:text-bg">
                {song.artists?.map((a) => a.name).join(', ')}
              </div>
              <div className="text-lg font-semibold text-accent group-hover:text-bg">
                {song.name}
              </div>
            </li>
          </a>
        ))}
      </ul>
      {(songs.length === 0 || songs.length < total) && (
        <div className="flex justify-center">
          <FoldingCube
            size={100}
            color="var(--color-accent)"
            className="mt-5"
          />
        </div>
      )}
    </div>
  )
}

export default Songs
