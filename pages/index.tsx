import type { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Pagination from '../components/pagination'


const Home: NextPage = () => {
  
  const [offset, setOffset] = useState(0);
  const [pageLimit] = useState(25)
  const [totalPageCount, setTotalPageCount] = useState(0)

  const fetchMovies = async (limit: any,offset: any) =>{
    const response = await fetch(`/api/getMovies?limit=${limit}&offset=${offset}`)
    const data = await response.json()
    setMovies(data.data.documents)
    setTotalPageCount(data.count)
  }

  useEffect(()=>{
    fetchMovies(pageLimit, offset)
  },[offset])

  const handleNextPage =  () => {
    setOffset((prevOffset) => prevOffset + pageLimit)
  }

  const handlePreviousPage = () => {
   if(offset > 0 ){
    setOffset((prevOffset) => {
      return prevOffset - pageLimit
    })
   } 
  }
  const [movies, setMovies] = useState([])

  return (
    <Layout>
      <section className="body-font text-gray-600 pb-4">
        <div className="mt-6 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-20">
          {movies.map((movie: any) => {
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
      <Pagination 
        totalMovies={totalPageCount}
        postPerPage={pageLimit}
        nextOffset={offset + pageLimit}
        currentPage={0}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </Layout>
  )
}

export default Home
