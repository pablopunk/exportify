import { FunctionComponent } from 'react'
import { COPYRIGHT } from 'config'

type Props = {}

const Footer: FunctionComponent<Props> = () => (
  <footer className="flex items-center justify-center h-footer bg-bgDim">
    © {COPYRIGHT} {new Date().getFullYear()}
  </footer>
)

export default Footer
