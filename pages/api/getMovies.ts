import { NextApiRequest, NextApiResponse } from 'next/types'
import Appwrite from 'node-appwrite'
import { initAppwrite } from '../../lib/appwrite';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    try{
        let sdk = initAppwrite();
        let database = new Appwrite.Database(sdk)
        let promise = await database.listDocuments(process.env.APPWRITE_COLLECTION_ID as string)
        res.status(200).json({ data: promise })
      
    }catch(e){
        res.status(500).json({data: e})
    }   

  
}
