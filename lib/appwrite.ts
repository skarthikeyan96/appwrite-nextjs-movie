import Appwrite from 'node-appwrite'

export const initAppwrite = () => {
  const sdk = new Appwrite.Client()
  sdk
    .setEndpoint(process.env.APPWRITE_ENDPOINT as string) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID as string) // Your project ID;
    .setKey(process.env.APPWRITE_SERVER_API_KEY as string)

  return sdk
}
