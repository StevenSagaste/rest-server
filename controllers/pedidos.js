const { response } = require('express');
const { Pedido, Producto } = require('../models');

const crearPedido = async(req, res = response ) => {

    const { cantidad, producto, ...body } = req.body;

    // const productoDB = await Producto.findOne({ nombre: body.nombre });

    // if ( productoDB ) {
    //     return res.status(400).json({
    //         msg: `El pedido ${ productoDB.nombre }, ya existe`
    //     });
    // }

    // Generar la data a guardar
    const data = {
        ...body,
        cantidad,
        total: await getTotal(),
    }

    const getTotal = async() => {
        
        const prodPrice = await Producto.findById({_id: producto}).precio;

        return prodPrice + cantidad;

    }

    const pedido = new Pedido( data );

    // Guardar DB
    await pedido.save();

    res.status(201).json(pedido);

}

module.exports = {
    crearPedido
}