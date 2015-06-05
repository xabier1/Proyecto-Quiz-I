//cargamos los modelos

var modelos = require('../modelos/modelos.js');

// GET /preguntas
exports.index = function(req, res) {

  modelos.Preguntas.findAll().then(function(Preguntas){

      res.render('preguntas/index', {preguntas: Preguntas});

  })

};

// GET /preguntas/pregunta
exports.pregunta = function(req, res) {

  var pregunta1;

  modelos.Preguntas.find(req.params.quizId).then(function(Preguntas){
    pregunta1 = Preguntas;
    res.render('preguntas/pregunta', { pregunta: pregunta1});
  })
};

// GET /preguntas/respuesta
exports.respuesta = function(req, res) {
  var respuesta_recibida = req.query.respuesta;
  var plantilla = 'preguntas/respuesta';
  var respuesta_enviada = undefined;
  var respuesta1;

  modelos.Preguntas.find(req.params.quizId).then(function(Preguntas){

    respuesta1 = Preguntas.respuesta;
    if (respuesta_recibida === respuesta1) {
      respuesta_enviada = "Correcto";
    }else {
      respuesta_enviada = "Incorrecto";
    }

    res.render(plantilla, { respuesta: respuesta_enviada, id: Preguntas.id});
  })



};
