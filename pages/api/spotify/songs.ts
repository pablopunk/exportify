import api from 'spotify/api'
import * as usetube from 'usetube'

export default async function SongsApi(req, res) {
  const accessToken = req.query.accessToken
  const refreshToken = req.query.refreshToken
  const page = req.query.page || 0

  if (!accessToken && !refreshToken) {
    return res.status(400).send('Missing accessToken and/or refreshToken')
  }

  try {
    api.setAccessToken(accessToken)
    api.setRefreshToken(refreshToken)

    const { body } = await api.refreshAccessToken()
    api.setAccessToken(body['access_token'])

    const apiLimit = 50
    const results = await api.getMySavedTracks({
      limit: apiLimit,
      offset: page * apiLimit,
    })
    const total = results.body['total']
    let songs = results.body.items.map((item) => item.track)

    const youtubeVideosPromises = songs.map((song) =>
      usetube
        .searchVideo(song.name + ' ' + song.artists[0].name)
        .then((results) => ({
          songId: song.id,
          id: results?.videos?.[0]?.id,
        }))
    )
    const youtubeVideos = await Promise.all(youtubeVideosPromises)
    songs = songs.map((song) => {
      const youtubeVideo: any = youtubeVideos.find(
        (v: any) => v.songId === song.id
      )

      if (!youtubeVideo.id) {
        return song
      }

      return {
        ...song,
        youtubeVideoId: youtubeVideo.id,
      }
    })

    return res.status(200).send({ songs, total })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send({ error: err.message })
  }
}
