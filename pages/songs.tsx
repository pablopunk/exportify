import { FunctionComponent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FoldingCube } from 'better-react-spinkit'

type Props = {}

const Songs: FunctionComponent<Props> = () => {
  const { query } = useRouter()
  const [code, setCode] = useState(null)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    if (code) {
      fetch(`/api/spotify/callback?code=${code}`)
        .then((response) => response.json())
        .then((results) => {
          setSongs(results)
        })
        .catch(() => {
          // window.location.href = '/' // try to login again to refresh token
        })
    }
  }, [code])

  useEffect(() => {
    if (query.code) {
      setCode(query.code)
    }
  }, [query])

  if (!code) {
    return <div>Not found</div>
  }

  return (
    <div>
      {songs.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="my-5">Hang on! This might take a while...</div>
          <FoldingCube
            size={100}
            color="var(--color-accent)"
            className="mt-5"
          />
        </div>
      )}
      <ul>
        {songs.map((song) => (
          <li key={song.id} className="flex items-center">
            <div className="mr-2 text-sm">
              {song.artists.map((a) => a.name).join(', ')}
            </div>
            <div className="text-lg font-semibold text-accent">{song.name}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Songs
