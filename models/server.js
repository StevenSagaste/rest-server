const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server{
    
    constructor(){

        this.app = express();
        this.port = process.env.PORT;


        this.ususarioPath = '/api/usuarios';
        this.authPath = '/api/auth';
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

        this.app.use(this.ususarioPath, require('../routes/usuarios.js'));
        this.app.use(this.authPath, require('../routes/auth.js'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;