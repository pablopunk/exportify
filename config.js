module.exports = {
  SITE_NAME: 'EXPORTIFY',
  SITE_URL:
    process.env.NODE_ENV === 'production'
      ? 'https://exportify.pablopunk.com'
      : process.env.SITE_URL || 'http://localhost:3000',
  SITE_DESCRIPTION: 'Save all your spotify music as mp3 files from youtube',
  COPYRIGHT: 'Pablo Varela',
}
