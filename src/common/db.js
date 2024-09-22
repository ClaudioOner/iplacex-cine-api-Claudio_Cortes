import { MongoClient, ServerApiVersion } from 'mongodb'


const uri = 'mongodb+srv://ev3_express:MILfoxQWZdQJZ7UJ@cluster-express.ljt2z.mongodb.net/cine-db?retryWrites=true&w=majority&tls=true'


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client
