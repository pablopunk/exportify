import { getAuthorizeUrl } from 'spotify/api'

export default async function (req, res) {
  const url = getAuthorizeUrl()
  res.writeHead(302, {
    Location: url,
  })
  res.end()
}
