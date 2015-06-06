var express = require('express');
var router = express.Router();

//variables de los controladores
var controlador = require('../controladores/preguntas');

//cargamos autoload para poder evitar posibles errores
//con el id de las preguntas
router.param('quizId', controlador.load); //autoload con el parametro :quizId

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

router.get('/preguntas', controlador.index);
router.get('/preguntas/:quizId(\\d+)', controlador.pregunta);
router.get('/preguntas/:quizId(\\d+)/respuesta',controlador.respuesta);


module.exports = router;
