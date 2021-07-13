import api from 'spotify/api'

const MAX_LIMIT = 50

export default async function (req, res) {
  const code = req.query.code as string

  if (!code) {
    return res.status(400).send('Missing code')
  }

  try {
    const data = await api.authorizationCodeGrant(code)
    const accessToken = data.body['access_token']

    api.setAccessToken(accessToken)

    const results = await api.getMySavedTracks({ limit: MAX_LIMIT })
    const total = results.body['total']
    let songs = results.body.items.map((item) => item.track)

    if (total > songs.length) {
      for (let offset = MAX_LIMIT; offset < total; offset += MAX_LIMIT) {
        const results = await api.getMySavedTracks({ limit: MAX_LIMIT, offset })
        songs = [...songs, ...results.body.items.map((item) => item.track)]
      }
    }

    return res.send(songs.map((song) => song.name))
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
