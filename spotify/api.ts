import { SITE_URL } from 'config'
import Spotify from 'spotify-web-api-node'

const redirectUri =
  (process.env.NODE_ENV === 'production' ? SITE_URL : 'http://localhost:3000') +
  '/songs'
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
