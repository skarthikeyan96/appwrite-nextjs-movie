import axios from 'axios'
import localforage from 'localforage'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout'

const Movie = (props: { movie: any }) => {
  const { movie } = props
  const [bookmarkStatus, setBookMarkedStatus] = useState(false);

  useEffect(()=>{
    const setBookMarkOnInit = async () => {
      const movies:any = await localforage.getItem('movies');
      if(movies && movies.length === 0){
        const filterMovie = movies.filter((data: any) => data.movie_id === movie.id);
        console.log(filterMovie)
        if(filterMovie.length  > 0){
          setBookMarkedStatus(true)
        }
      }
     
    }
    setBookMarkOnInit()
  },[])

  const handleBookmark = async () => {
    console.log("store the data in localstorage")
    const data = await localforage.getItem("movies");

    const movieDataToStore = {
      movie_id: movie.id,
      title: movie.title,
      thumbnail_image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
      popularity: movie.popularity,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }
    if(!data){
      localforage.setItem("movies", [movieDataToStore])
      setBookMarkedStatus(true)
    }else{
      const existingData:any = await localforage.getItem('movies');
      const filteredData:any = existingData.filter((data: { movie_id: any }) => movie.id === data.movie_id);
      console.log("movie exists" ,filteredData)
      if(filteredData.length === 0){
        // movie does not exists in the indexDB 
        localforage.setItem("movies", [...existingData, movieDataToStore])
        setBookMarkedStatus(!bookmarkStatus)
      }
    }
  }


  return (
    <>
      <Layout>
        <div className="flex flex-col space-y-8 items-center lg:items-start lg:flex-row lg:space-x-8 lg:space-y-0">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="w-2/3 lg:w-1/4"
          />
          <div className="flex flex-col justify-items-start space-y-12">
            <div className="flex flex-col  items-center justify-between space-y-2 lg:space-y-4 lg:items-start">
              <h1 className="text-2xl font-bold text-center lg:text-left"> {movie.title} </h1>
              <div className="flex flex-shrink-1 items-center  pr-2 text-sm space-x-2">
                <div className="rounded-r bg-green-200 px-2 py-1 text-green-700">
                  <p> {movie.status} </p>
                </div>
                {movie.genres.map((genre: any) => {
                  return (
                    <div className="rounded-r bg-green-200 px-2 py-1 text-green-700 whitespace-nowrap">
                      <p> {genre.name} </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className='text-center md:text-justify'>
              <p> {movie.overview} </p>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <a
                href={movie.homepage}
                target="_blank"
                className="flex items-center space-x-2   bg-black p-2 pl-5 pr-5 text-lg text-white "
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                </svg>
                <span>Movie Homepage</span>
              </a>
              <button className='flex items-center space-x-2   bg-black p-2 pl-5 pr-5 text-lg text-white ' onClick={handleBookmark}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
              <span> {bookmarkStatus ? "Bookmarked" : "Bookmark"} </span>
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.query

  const response = await axios(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_MOVIE_KEY}&language=en-US`
  )

  const data = await response.data
  return {
    props: {
      movie: data,
    },
  }
}

export default Movie
