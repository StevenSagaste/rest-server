const path = require('path');
const { v4: uuidv4 } = require('uuid');



const subirArchivo = ( files, extencionesValidas = ['png','jpg','jpeg','gif','jfif','svg'], carpeta = '' ) => {

    return new Promise((resolve, rejct) => {
       
        // console.log('req.files >>>', req.files); // eslint-disable-line
        const { archivo } = files;

        const cutName = archivo.name.split('.');
        const extension = cutName[ cutName.length - 1 ];

        //validate extension
        if (!extencionesValidas.includes(extension)) {
            return  rejct(`Extencion de archivo: ${extension}, validas ${extencionesValidas}`)
        }

        // res.json({ extension });
        const tempFileName = uuidv4() + '.' + extension;

        const uploadPath = path.join( __dirname, '../uploads/', carpeta , tempFileName );
    
        archivo.mv(uploadPath, (err) => {
            
            if (err) {
                rejct(err);
            }
    
            resolve(tempFileName);
        });
        
    });
      
    



}





module.exports = {
    subirArchivo
}