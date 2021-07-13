import { FunctionComponent } from 'react'

type Props = {}

const Index: FunctionComponent<Props> = () => (
  <div className="flex items-center justify-center mt-[20vh]">
    <a
      href="/api/spotify"
      className="p-2 text-xl transition-colors border rounded-md shadow-md bg-accent text-bg hover:bg-bg hover:text-accent"
    >
      Sign in with Spotify
    </a>
  </div>
)

export default Index
