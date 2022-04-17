import axios from 'axios'
import Layout from '../../components/layout'

const Movie = (props: { movie: any }) => {
  const { movie } = props

  const handleBookmark = () => {
    console.log("store the data in localstorage")
  }


  return (
    <>
      <Layout>
        <div className="flex space-x-8">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="w-1/4"
          />
          <div className="flex flex-col justify-items-start space-y-12">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold"> {movie.title} </h1>
              <div className="flex flex-shrink-0 items-center space-x-2 pr-2 text-sm">
                <div className="rounded-r bg-green-200 px-2 py-1 text-green-700">
                  <p> {movie.status} </p>
                </div>
                {movie.genres.map((genre: any) => {
                  return (
                    <div className="rounded-r bg-green-200 px-2 py-1 text-green-700">
                      <p> {genre.name} </p>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <p> {movie.overview} </p>
            </div>
            <div className="flex space-x-2">
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
              <span> Bookmark </span>
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
