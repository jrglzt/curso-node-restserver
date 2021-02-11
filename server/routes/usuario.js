const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');

const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');


const app = express();

app.get('/usuarios', verificaToken, (req, res) => {


    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre,
    //     email: req.usuario.email

    // });
    //res.json('get Usuario LOCAL')
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //Usuario.find({ google: true })

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {


            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //Usuario.count({ google: true }, (err, conteo) => {
            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo

                });

            })


        })
});
app.post('/usuarios', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB

        });

    });




    /*  if (body.nombre === undefined) {

         res.status(400).json({
             ok: false,
             mensaje: 'El nombre es necesario'

         });
     } else {
         res.json({
             persona: body
         });
     } */
});
app.put('/usuarios/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);





    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })

});
app.delete('/usuarios/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    }

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });


    });

    //res.json('delete Usuario')
});


/* ELIMINACION FISICA
app.delete('/usuarios/:id', function(req, res) {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });


    });

    //res.json('delete Usuario')
});
*/

module.exports = app;