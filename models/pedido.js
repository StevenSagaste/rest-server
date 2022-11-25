const { Schema, model } = require('mongoose');

const PedidoSchema = Schema({
    cliente: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    cantidad: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        default: 0
    },
    descripcion: {
        type: String,
        default: "descripcion"
    },
    timestamp: {
        type: Date,
        createdAt: new Date()
    }
});


PedidoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Pedido', ProductoSchema );