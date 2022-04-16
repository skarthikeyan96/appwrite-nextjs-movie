import Link from 'next/link'

const Layout = ({ children }: any) => {
  return (
    <>
      <header className="body-font text-gray-600">
        <div className="container mx-auto flex flex-col flex-wrap items-center p-8 md:flex-row">
          <Link href="/">
            <span className="cursor-pointer text-2xl title-font mb-4 flex items-center font-medium text-gray-900 md:mb-0">
              Mflix
            </span>
          </Link>
        </div>
      </header>
      <div className="container mx-auto p-8">{children}</div>
    </>
  )
}

export default Layout
