const { Router } = require('express');
const { check } = require('express-validator');

const { verificaToken } = require('../middlewares/autenticacion');

const router = Router();

//{{url}}/categorias
//obtener todos o todas las catergorias - público
router.get('/categoria', (req, res) => {
    //console.log('Todo OK');
    res.json('Get');


});

//obtener una categoria por id - público
router.get('/categoria/:id', (req, res) => {
    //console.log('Todo OK');
    res.json('Get id');

});

//crear categoria - privado - cualquier persona con token válido
router.post('/categoria', [verificaToken, check('nombre', 'El nombre es obligatorio').not().isEmpty()], (req, res) => {
    //console.log('Todo OK');
    res.json('Post');


});

//actualizar - privado  - cualquiera con token válido
router.put('/categoria/:id', (req, res) => {
    //console.log('Todo OK');
    res.json('Put');
});

//ualizar - privado  - cualquiera con token válido
router.delete('/categoria/:id', (req, res) => {
    //console.log('Todo OK');
    res.json('Delete');
});




module.exports = router;