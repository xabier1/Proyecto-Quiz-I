var express = require('express');
var router = express.Router();

//variables de los controladores
var controlador = require('../controladores/preguntas');

/* GET home page. */
router.get('/', function(req, res, next) {
  var plantilla = "index";
  var datos = { title: 'Quiz' };
  res.render(plantilla, datos);
});

router.get('/author', function(req, res, next) {
  var plantilla = 'author';
  var datos = {};

  res.render(plantilla, datos);
});

router.get('/preguntas/pregunta', controlador.pregunta);
router.get('/preguntas/respuesta',controlador.respuesta);


module.exports = router;
