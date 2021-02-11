const express = require('express');


let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');



//mostrar todas las categorias
app.get('/categoria', (req, res) => {

});

//mostrar una categoria por id
app.get('/categoria/:id', (req, res) => {
    //Categoria.findById(...);
});

//crear una categoria
app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoria
    //req.Usuario._id
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});

app.put('/categoria/:id', (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
    //solo actualiza la descripcion de la categoria
});

//borrar categorias
app.delete('/categoria/:id', (req, res) => {
    //solo un administrador puede borrar categorias
    //Categoria.findByIdRemove

});

module.exports = app;