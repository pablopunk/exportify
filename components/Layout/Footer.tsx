import { FunctionComponent } from 'react'
import { COPYRIGHT } from 'config'

type Props = {}

const Footer: FunctionComponent<Props> = () => (
  <footer className="flex items-center justify-center border h-footer">
    © {COPYRIGHT} {new Date().getFullYear()}
  </footer>
)

export default Footer
