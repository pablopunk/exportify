import { SITE_URL } from 'config'
import Spotify from 'spotify-web-api-node'

const redirectUri = SITE_URL + '/songs'
const clientSecret = process.env.SPOTIFY_SECRET
const clientId = process.env.SPOTIFY_CLIENT_ID

const api = new Spotify({
  clientId,
  clientSecret,
  redirectUri,
})

export function getAuthorizeUrl() {
  const scopes = ['user-read-private', 'user-read-email', 'user-library-read']
  const authorizeUrl = api.createAuthorizeURL(scopes)

  return authorizeUrl
}

export default api
