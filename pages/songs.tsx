import { FunctionComponent } from 'react'
import api from 'spotify/api'

type Props = { songs: Array<any> }

const Songs: FunctionComponent<Props> = ({ songs }) => (
  <div>
    <h1>Songs</h1>
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

export default Songs

export async function getServerSideProps(ctx) {
  try {
    const code = ctx.query.code
    const data = await api.authorizationCodeGrant(code)
    const accessToken = data.body['access_token']

    api.setAccessToken(accessToken)

    const apiLimit = 50
    const results = await api.getMySavedTracks({ limit: apiLimit })
    const total = 20 //results.body['total']
    let songs = results.body.items.map((item) => item.track)

    if (total > songs.length) {
      for (let offset = apiLimit; offset < total; offset += apiLimit) {
        const results = await api.getMySavedTracks({ limit: apiLimit, offset })
        songs = [...songs, ...results.body.items.map((item) => item.track)]
      }
    }

    return { props: { songs } }
  } catch (err) {
    return { notFound: true }
  }
}
