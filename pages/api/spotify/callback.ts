import api from 'spotify/api'
import * as usetube from 'usetube'

export default async function (req, res) {
  const code = req.query.code as string

  try {
    if (!code) {
      return res.status(400).send('Missing code')
    }

    const data = await api.authorizationCodeGrant(code)
    const accessToken = data.body['access_token']

    api.setAccessToken(accessToken)

    const apiLimit = 20
    const results = await api.getMySavedTracks({ limit: apiLimit })
    const total = results.body['total']
    let songs = results.body.items.map((item) => item.track)

    let songPromises = []
    if (total > songs.length) {
      for (
        let offset = apiLimit;
        offset + apiLimit <= total;
        offset += apiLimit
      ) {
        songPromises.push(api.getMySavedTracks({ limit: apiLimit, offset }))
      }
    }

    songs = [
      ...songs,
      ...(await Promise.all(songPromises)).flatMap((item) =>
        item.body.items.map((item) => item.track)
      ),
    ]

    usetube.searchVideo(songs[0].name + ' ' + songs[0].artists[0].name)

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

    return res.status(200).send(songs)
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
