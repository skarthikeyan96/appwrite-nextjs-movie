import type { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/layout'

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/getMovies')
  const { data } = await response.json()
  return {
    props: {
      movies: data.documents,
    },
  }
}
const Home: NextPage = (props: any) => {
  const { movies } = props

  return (
    <Layout>
      <section className="body-font text-gray-600">
        <div className="mt-6 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-20">
          {movies.map((movie: any) => {
            console.log(movie)
            return (
              <a className="cursor-pointer">
                <Link href={`/movie/${movie.movie_id}`}>
                  <div key={movie.movie_id} className="group relative">
                    <div className="min-h-80 aspect-w-1 aspect-h-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                      <img
                        src={movie.thumbnail_image}
                        alt={movie.title}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-gray-700">
                        
                          {movie.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(movie.release_date).toDateString()}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {movie.price}
                      </p>
                    </div>
                  </div>
                </Link>
              </a>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export default Home
