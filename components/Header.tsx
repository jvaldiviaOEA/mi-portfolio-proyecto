import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Link href="/"><a className="brand">Bookingnefilo</a></Link>
      </div>
    </header>
  )
}
