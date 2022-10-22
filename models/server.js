const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server{
    
    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            // buscar:     '/api/buscar',
            categorias: '/api/categorias',
            // productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            // uploads:    '/api/uploads',
            productos:   '/api/productos',

            buscar:   '/api/buscar',
        }

        // this.ususarioPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        //db connect
        this.ConnectDB();
        //middelwares
        this.middlewares();
        //routs
        this.routes();
    }

    async ConnectDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use( express.json());
        //public directory
        this.app.use( express.static('public'));
    }

    routes(){

        this.app.use(this.paths.auth, require('../routes/auth.js'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios.js'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;