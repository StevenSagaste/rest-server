const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config.js');

class Server{
    
    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categorias: '/api/categorias',
            productos:   '/api/productos',
            buscar:   '/api/buscar',
            uploads:   '/api/uploads',
            dashboard: '/dashboard',
            pedidos: '/api/pedidos'
        }

        this.ConnectDB();
        
        this.middlewares();
        
        this.routes();
    }

    async ConnectDB(){
        await dbConnection();
    }

    middlewares(){
        
        this.app.use(cors());

        this.app.use( express.json());
        
        this.app.use( express.static('public'));
 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes(){

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.pedidos, require('../routes/pedidos'));
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;