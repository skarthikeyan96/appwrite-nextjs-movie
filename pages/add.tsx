import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout'

const Add = () => {
  const [id, setImdbId] = useState('')
  const router = useRouter()
  const handleAddMovie = async () => {
    try {
      const response = await fetch(
        `${process.env.API_ORIGIN_DOMAIN}api/addMovie?imdbID=${id}`
      )
      const data = await response.json()
      if (response.status === 200 && data.id) {
        console.log(
          'Added the movie succesfully, redirecting to the movie page'
        )
        return router.push(`/movie/${data.id}`)
      }
      if(response.status === 409 && data.id){
        console.log(
            'Movie already exists, redirecting to the movie page'
          )
          return router.push(`/movie/${data.id}`)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Layout>
      <label className="flex flex-row space-x-2">
        <input
          type="text"
          className=" block w-1/2"
          placeholder="Enter IMDB ID"
          onChange={(e) => setImdbId(e.target.value)}
        />
        <button
          className="bg-black p-2 px-4 text-lg text-white"
          onClick={handleAddMovie}
        >
          Add Movie
        </button>
      </label>
    </Layout>
  )
}

export default Add
