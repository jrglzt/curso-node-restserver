const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({

    descripcion: {
        type: String,
        unique: true,
        required: [true, 'la categoria es necesario']
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

});


module.exports = mongoose.model('Categoria', categoriaSchema);

//////


// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// let categoriaSchema = new Schema({
//     descripcion: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
//     usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
// });


// module.exports = mongoose.model('Categoria', categoriaSchema);