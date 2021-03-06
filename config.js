module.exports = {
  SITE_NAME: 'EXPORTIFY',
  SITE_URL:
    process.env.NODE_ENV === 'production'
      ? process.env.VERCEL_ENV === 'production'
        ? 'https://exportify.pablopunk.com' // real production
        : process.env.NEXT_PUBLIC_VERCEL_URL // production preview on vercel
      : process.env.SITE_URL || 'http://localhost:3000', // dev
  SITE_DESCRIPTION: 'Save all your spotify music as mp3 files from youtube',
  COPYRIGHT: 'Pablo Varela',
}
