import { ObjectId } from 'mongodb';
import client from '../common/db.js';


const actorCollection = client.db('cine-db').collection('actores');
const peliculaCollection = client.db('cine-db').collection('peliculas');

async function handleInsertActorRequest(req, res) {
    const { idPelicula, nombre, edad, estadoRetirado, premios } = req.body;

    try {
        if (!ObjectId.isValid(idPelicula)) {
            return res.status(400).send('Error ID de pelicula ');
        }

        const peliculaId = new ObjectId(idPelicula);

     
        const pelicula = await peliculaCollection.findOne({ _id: peliculaId });
        if (!pelicula) {
            return res.status(404).send('Peli no encontrada !!!!');
        }

        
        const nuevoActor = {
            _id: new ObjectId(), 
            idPelicula: peliculaId, 
            nombre,
            edad,
            estadoRetirado,
            premios
        };
        const result = await actorCollection.insertOne(nuevoActor);

        if (result.insertedCount === 0) {
            return res.status(400).send('Error al registrar el actor');
        }

        return res.status(201).send({ _id: result.insertedId, ...nuevoActor });
    } catch (e) {
        console.error('Error al registrar actor:', e); 
        return res.status(500).send({ error: e.message });
    }
}



async function handleGetActoresRequest(req, res){
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data) })
    .catch((e) => { return res.status(500).send({ error: e }) })
}




async function handleGetActorRequest(req, res){
    let id = req.params.id

    try{
        let oid = ObjectId.createFromHexString(id)

        await actorCollection.findOne({ _id: oid })
        .then((data) => {
            if(data === null) return res.status(404).send(data)

            return res.status(200).send(data)
        })
        .catch((e) => {
            return res.status(500).send({ error: e.code })
        })
    }catch(e){
        return res.status(400).send('ERROR ! Id con problemas, favor verificar ')
    }
}


async function handleGetActoresByPeliculaIdRequest(req, res) {
    const { id } = req.params; 

    try {
        if (!ObjectId.isValid(id)) {
            return res.status(400).send('ID mal formado');
        }

        const peliculaId = new ObjectId(id);
        const actores = await actorCollection.find({ idPelicula: peliculaId }).toArray();

        if (actores.length === 0) {
            return res.status(404).send('No se encontraron actores para esta película');
        }

        return res.status(200).send(actores);
    } catch (e) {
        console.error('Error al obtener actores por ID de película:', e);
        return res.status(500).send({ error: e.message });
    }
}





export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorRequest,
    handleGetActoresByPeliculaIdRequest
 
    
};
