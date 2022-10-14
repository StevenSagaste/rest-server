const mongoose = require('mongoose');

const dbConnection = async ()=>{

    try {

        mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            //useIndefinedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        })
        .then(console.log("connected to server"))
        .catch((err) => console.log(err));

        //console.log('base de datos en blanco');
        
    } catch (error) {
        console.log(error);
        throw new Error(' error al inicial base de datos');
    }
}

module.exports = {
    dbConnection
}