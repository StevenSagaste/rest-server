const path = require("path");
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response, request } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");


const uploadFile = async (req = request, res = response) => {

    try {
        
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );
        const nombre = await subirArchivo( req.files, undefined );
        res.json({ nombre });

    } catch (err) {
                    return res.status(400).json({err});
    }

}

const subirImagen = async(req, res) => {

  const {id, coll} = req.params;

  let modelo;

  switch (coll) {
    case 'usuarios':

        modelo = await  Usuario.findById(id);
        if (!modelo) {
            return res.json({
                msg: `id: ${id} inexistente`
            });
        }

        break;

    case 'productos':

        modelo = await  Producto.findById(id);
        if (!modelo) {
            return res.json({
                msg: `id: ${id} inexistente`
            });
        }

        break;

    default:
        return res.status(500).json({msg: 'Falta una validacion para eso'})
  }

  if (modelo.img) {
    const pathImg = path.join( __dirname, '../uploads', coll, modelo.img );
    if(fs.existsSync(pathImg)){
        fs.unlinkSync(pathImg);
    }
  }

  nombre = await subirArchivo( req.files, undefined, req.params.coll );
  modelo.img = nombre;
  await modelo.save();

  return res.json({ modelo });

}

const mostrarImagen = async (req, res) => {

    const {id, coll} = req.params;

    let modelo;
  
    switch (coll) {
      case 'usuarios':
  
          modelo = await  Usuario.findById(id);
          if (!modelo) {
              return res.json({
                  msg: `id: ${id} inexistente`
              });
          }
  
          break;
  
      case 'productos':
  
          modelo = await  Producto.findById(id);
          if (!modelo) {
              return res.json({
                  msg: `id: ${id} inexistente`
              });
          }
  
          break;
  
      default:
          return res.status(500).json({msg: 'Falta una validacion para eso'})
    }
  
    if (modelo.img) {
      const pathImg = path.join( __dirname, '../uploads', coll, modelo.img );
      if(fs.existsSync(pathImg)){
          return res.sendFile(pathImg);
      }
    }
    
    const pathImg = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile(pathImg);

}

const subirImagenCloudinary = async(req, res) => {

    const {id, coll} = req.params;
  
    let modelo;
  
    switch (coll) {
      case 'usuarios':
  
          modelo = await  Usuario.findById(id);
          if (!modelo) {
              return res.json({
                  msg: `id: ${id} inexistente`
              });
          }
  
          break;
  
      case 'productos':
  
          modelo = await  Producto.findById(id);
          if (!modelo) {
              return res.json({
                  msg: `id: ${id} inexistente`
              });
          }
  
          break;
  
      default:
          return res.status(500).json({msg: 'Falta una validacion para eso'})
    }
  
    if (modelo.img) {
      const pathImg = path.join( __dirname, '../uploads', coll, modelo.img );
      if(fs.existsSync(pathImg)){
          fs.unlinkSync(pathImg);
      }
    }
        // Limpiar imágenes previas
        if ( modelo.img ) {
            const nombreArr = modelo.img.split('/');
            const nombre    = nombreArr[ nombreArr.length - 1 ];
            const [ public_id ] = nombre.split('.');
            cloudinary.uploader.destroy( public_id );
        }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    // nombre = await subirArchivo( req.files, undefined, req.params.coll );
    modelo.img = secure_url;
    await modelo.save();
  
    return res.json(modelo);
  
  }

// const updateImg = async (req = request, res = response) =>{

// 	const { id,collection } = req.params;

//     let modelo
    
//     switch (collection) {
//         case 'usuarios':
//             modelo = await Usuario.findById(id);
//             if (!modelo) {
//                 res.status(400).json({
//                     msg: `no existe usuario con id: ${id}`
//                 });
//             }
//         break;
            
//         case 'productos':
//             modelo = await Producto.findById(id);
//             if (!modelo) {
//                 res.status(400).json({
//                     msg: `no existe producto con id: ${id}`
//                 });
//             }
//         break;
            
//         default:
//             return res.status(500).json({msg:`la coleccion ${collection} no esta validada`})
//     }

//     const nombre = await uploadFile( req.files, undefined, collection );
//     modelo.img = nombre;

//     await modelo.save();
//     res.json( modelo );

// }

        
module.exports = {
    uploadFile,
    subirImagen,
    mostrarImagen,
    subirImagenCloudinary,
	// updateImg
}