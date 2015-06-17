var express = require('express');
var router = express.Router();
var modelos = require('../modelos/modelos.js');

//variables de los controladores
var controlador = require('../controladores/preguntas');
var controladorComentarios = require('../controladores/comentarios');
var controladorUsuarios = require('../controladores/sesiones');
var controladorEstadisticas = require('../controladores/estadisticas');

//cargamos autoload para poder evitar posibles errores
//con el id de las preguntas
router.param('quizId', controlador.load); //autoload con el parametro :quizId
router.param('commentId', controladorComentarios.load); //autoload con el parametro :commentId

/* GET home page. */
router.get('/', function(req, res, next) {
  var plantilla = "index";
  var datos = { title: 'Quiz', errores:[] };
  res.render(plantilla, datos);
});

router.get('/author', function(req, res, next) {
  var plantilla = 'author';
  var datos = {errores:[]};

  res.render(plantilla, datos);
});
//rutas para las sesiones de los usuarios
router.get('/login', controladorUsuarios.nuevo); //formulario para iniciar session
router.post('/login', controladorUsuarios.crear);//crear la sesion de un usuario
router.get('/logout', controladorUsuarios.eliminar);//eliminar la sesion

// rutas para las preguntas
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
      res.render('preguntas/pre_encontradas', { preguntas: preguntas, errores:[]});

    })

  }else {
    //si no coincide sigue con el siguiente router...
    next();
  }

});


router.get('/preguntas', controlador.index);
router.get('/preguntas/:quizId(\\d+)', controlador.pregunta);
router.get('/preguntas/:quizId(\\d+)/respuesta',controlador.respuesta);
router.get('/preguntas/nuevo',controladorUsuarios.loginRequired,controlador.nuevo);
router.post('/preguntas/crear',controladorUsuarios.loginRequired,controlador.crear);
router.get('/preguntas/:quizId(\\d+)/editar',controladorUsuarios.loginRequired,controlador.editar);
router.put('/preguntas/:quizId(\\d+)',controladorUsuarios.loginRequired,controlador.actualizar);
router.delete('/preguntas/:quizId(\\d+)',controladorUsuarios.loginRequired,controlador.eliminar);
router.get('/preguntas/tematica',controladorUsuarios.loginRequired,controlador.tematica);

//rutas para los comentarios
router.get('/preguntas/:quizId(\\d+)/comentarios/nuevo',controladorComentarios.nuevo);
router.post('/preguntas/:quizId(\\d+)/comentarios',controladorComentarios.crear);
router.get(
  '/preguntas/:quizId(\\d+)/comentarios/:commentId(\\d+)/publicar',
  controladorUsuarios.loginRequired,
  controladorComentarios.publicar);

//rutas para las estadisticas
router.get('/preguntas/estadisticas', controladorEstadisticas.index);


module.exports = router;
