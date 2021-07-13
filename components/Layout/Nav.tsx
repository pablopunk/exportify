import { FunctionComponent } from 'react'
import Link from 'next/link'
import useTheme from 'hooks/useTheme'

const LINKS = [
  { label: 'Github', href: 'https://github.com/pablopunk/exportify' },
]

type Props = {}

const Page: FunctionComponent<Props> = () => {
  const [theme, toggleTheme] = useTheme()
  const linkStyles =
    'px-2 py-1 ml-2 text-bg rounded-md focus:outline-none transition-all hover:text-bgDim'

  return (
    <nav>
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href}>
          <a className={linkStyles}>{link.label}</a>
        </Link>
      ))}
      <button className={linkStyles} onClick={toggleTheme}>
        {theme === 'dark' ? '🌚' : '🌝'}
      </button>
    </nav>
  )
}

export default Page
