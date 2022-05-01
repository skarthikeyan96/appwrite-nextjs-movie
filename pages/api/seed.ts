// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Appwrite from 'node-appwrite'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { initAppwrite } from '../../lib/appwrite'

type Data = {
  data: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let sdk = initAppwrite()
  let database = new Appwrite.Database(sdk)
  const response = await axios(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_MOVIE_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${req.query.page}`
  )
  const data = await response.data

  try {
    for (let i = 0; i < data.results.length; i++) {
      const item = data.results[i]
     let promise = await database.createDocument(
        process.env.APPWRITE_COLLECTION_ID as string,
        uuidv4(),
        {
          movie_id: item.id,
          title: item.title,
          thumbnail_image: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
          popularity: item.popularity,
          release_date: item.release_date,
          vote_average: item.vote_average,
        }
      )

      console.log(promise)
    }
    res.status(200).json({ data: 'OK' })
  } catch (e) {
    console.log(e)
    res.status(500).json({ data: 'NOT OK' })
  }
}
