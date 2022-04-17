import Link from 'next/link'

const Layout = ({ children }: any) => {
  return (
    <>
      <header className="body-font text-gray-600">
        <div className="container mx-auto flex flex-col flex-wrap items-center p-8 md:flex-row">
          <Link href="/">
            <span className="title-font mb-4 flex cursor-pointer items-center text-2xl font-medium text-gray-900 md:mb-0">
              Mflix
            </span>
          </Link>
          <nav className="flex flex-wrap items-center justify-center text-base md:mr-auto	md:ml-4 md:border-l md:border-gray-400 md:py-1 md:pl-4">
            <span className="mr-5 hover:text-gray-900">
              <Link href="/add">Add Movie</Link>
            </span>
            <span className="mr-5 hover:text-gray-900">
              <Link href="/bookmark">Bookmarks</Link>
            </span>
          </nav>
        </div>
      </header>
      <div className="container mx-auto p-8">{children}</div>
    </>
  )
}

export default Layout
