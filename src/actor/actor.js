import { BSONType, ObjectId } from 'mongodb'

export const Actor = {
    _id: ObjectId,
    idPelicula: BSONType.string,
    nombre: BSONType.string,
    edad: BSONType.int,
    estadoRetirado: BSONType.bool,
    premios: BSONType.array
}