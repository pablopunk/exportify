import api from 'spotify/api'

export default async function (req, res) {
  const code = req.query.code as string

  try {
    if (!code) {
      return res.status(400).send('Missing code')
    }

    const data = await api.authorizationCodeGrant(code)
    const accessToken = data.body['access_token']
    const refreshToken = data.body['refresh_token']
    const expiresIn = data.body['expires_in']

    return res.status(200).send({
      accessToken,
      refreshToken,
      expiresIn,
    })
  } catch (err) {
    return res.status(500).send({ error: err.message })
  }
}
