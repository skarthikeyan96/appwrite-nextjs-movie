import Appwrite from 'node-appwrite';
import { initAppwrite } from '../../lib/appwrite';
export default async function handler(req: any, res:any) {
  
  try{
    const sdk = initAppwrite()
    
    let database = new Appwrite.Database(sdk)
    await database.deleteCollection(process.env.APPWRITE_COLLECTION_ID as string);
    res.status(200).json({ data: "OK" })
  }catch(e){
    res.status(500).json({data: e})
  }
   
}