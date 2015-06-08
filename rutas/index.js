var express = require('express');
var router = express.Router();
var modelos = require('../modelos/modelos.js');
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

router.get('/preguntas', function(req, res, next) {

  if (req.query.search !== undefined) {
    //Si existe el query search
    var buscar = req.query.search;
    //sustituimos los espacios en blanco por %
    buscar.replace(/\s/g,"%");
    //generamos el texo que se va abuscar en la base de datos
    var buscar1= "%" + buscar + "%";
    //hacemos la consulta a la base de datos
    modelos.Preguntas.findAll({
      //tipo de consulta
      where: ["pregunta like ?",buscar1]
    }).then(function(preguntas){
      //se manda los datos a la plantilla para renderizar
      res.render('preguntas/pre_encontradas', { preguntas: preguntas});

    })

  }else {
    //si no coincide sigue con el siguiente router...
    next();
  }

});


router.get('/preguntas', controlador.index);
router.get('/preguntas/:quizId(\\d+)', controlador.pregunta);
router.get('/preguntas/:quizId(\\d+)/respuesta',controlador.respuesta);
router.get('/preguntas/nuevo',controlador.nuevo);
router.post('/preguntas/crear',controlador.crear);



module.exports = router;
