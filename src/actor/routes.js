import express from 'express'
import controller from './controller.js'

const actorRoutes  = express.Router()

actorRoutes.post('/actor', controller.handleInsertActorRequest)
actorRoutes.get('/actores', controller.handleGetActoresRequest)
actorRoutes.get('/actor/:id', controller.handleGetActorRequest)
actorRoutes.get('/actores/pelicula/:id', controller.handleGetActoresByPeliculaIdRequest);


export default actorRoutes