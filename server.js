import express, { urlencoded } from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const PORT = process.env.PORT || 3000; // Usa la variable de entorno PORT o 3000 como predeterminado
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.all('/', (req, res) => {
    return res.status(200).send('Bienvenido al cine Iplacex');
});
app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

await client.connect()
    .then(() => {
        console.log('Conectado con éxito al Cluster!');
        app.listen(PORT, '0.0.0.0', () => { // Escucha en 0.0.0.0
            console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
        });
    })
    .catch(() => {
        console.log('ERROR al conectar al Cluster de Atlas');
    });
