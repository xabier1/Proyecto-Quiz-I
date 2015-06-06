//cargamos los modelos

var modelos = require('../modelos/modelos.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {

  modelos.Preguntas.find(quizId).then(
    function (quiz) {
        //verifica si el id que buscamos existe
        if (quiz) {
          req.quiz = quiz;
          next();
        }else {
          //se genera un error
          next(new Error ('No existe esta pregunta = ' + quizId));
        }
    }

  ).catch(function(error) {next(error);});

};

// GET /preguntas
exports.index = function(req, res) {

  modelos.Preguntas.findAll().then(function(Preguntas){

      res.render('preguntas/index', {preguntas: Preguntas});

  })

};

// GET /preguntas/:quizId
exports.pregunta = function(req, res) {

  res.render('preguntas/pregunta', { pregunta: req.quiz});

};

// GET /preguntas/:quizId/respuesta
exports.respuesta = function(req, res) {
  var respuesta_recibida = req.query.respuesta;
  var plantilla = 'preguntas/respuesta';
  var respuesta_enviada = undefined;
  var respuesta1 = req.quiz.respuesta;

  if (respuesta_recibida === respuesta1) {
      respuesta_enviada = "Correcto";
  }else {
      respuesta_enviada = "Incorrecto";
  }

  res.render(plantilla, { respuesta: respuesta_enviada, id: req.quiz.id});

};
