const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config.js');
const { socketController } = require('../sockets/controller.js');

class Server{
    
    constructor(){

        this.app    = express();
        this.port   = process.env.PORT;

        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')(this.server);


        this.paths = {
            auth:       '/api/auth',
            // buscar:     '/api/buscar',
            categorias: '/api/categorias',
            // productos:  '/api/productos',
            usuarios:   '/api/usuarios',
            // uploads:    '/api/uploads',
            productos:   '/api/productos',

            buscar:   '/api/buscar',
            
            uploads:   '/api/uploads',

            dashboard: '/dashboard'
        }

        // this.ususarioPath = '/api/usuarios';
        // this.authPath = '/api/auth';
        //db connect
        this.ConnectDB();
        //middelwares
        this.middlewares();
        //routs
        this.routes();
        //sockets
        this.sockets();
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

        // fileup 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){

        this.app.use(this.paths.auth, require('../routes/auth.js'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios.js'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    sockets() {
       this.io.on('connection', (socket) => socketController(socket, this.io)); 
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;