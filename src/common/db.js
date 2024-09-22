import { MongoClient, ServerApiVersion } from 'mongodb'


const uri = "mongodb+srv://ev3_express:MILfoxQWZdQJZ7UJ@cluster.mongodb.net/<nombre_base_datos>?tls=true&retryWrites=true&w=majority";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client
