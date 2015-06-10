//cargamos los modelos

var modelos = require('../modelos/modelos.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {

  modelos.Preguntas.findById(quizId).then(
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

      res.render('preguntas/index', {preguntas: Preguntas, errores:[]});

  })

};

// GET /preguntas/:quizId
exports.pregunta = function(req, res) {

  res.render('preguntas/pregunta', { pregunta: req.quiz, errores:[]});

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

  res.render(plantilla, { respuesta: respuesta_enviada, id: req.quiz.id, errores:[]});

};

// GET /preguntas/nuevo
exports.nuevo = function(req, res) {

  var pregunta = modelos.Preguntas.build({
      pregunta:"Pregunta",
      respuesta:"Respuesta",
      tematica: "La Tematica"
  });

  res.render('preguntas/nuevo', {pregunta: pregunta,tematica:undefined, errores:[]});
};

// POST /preguntas/crear

exports.crear = function(req, res) {

  var pregunta = modelos.Preguntas.build(req.body.datos);
  //guardar datos en ls columnas pregunta y respuesta
  pregunta
  .validate()//validar datos
  .then(function(err){
      //Si existen errores
      if (err) {
        res.render('preguntas/nuevo', {pregunta: pregunta, errores: err.errors});
      }else {
        pregunta
        .save({fields: ["pregunta", "respuesta", "tematica"]})//se guardan los datos
        .then(function(){ res.redirect('/preguntas'); }) //se redirecciona
      }


    });

};

// GET /preguntas/:quizId(\\d+)/editar
exports.editar = function(req, res) {

  //autoload de instancia de quiz
  var pregunta = req.quiz;

  //se envias los datos a la plantilla
  res.render('preguntas/editar', {
        pregunta: pregunta,
        id: pregunta.id,
        tematica: pregunta.tematica,
        errores:[]

  });


};

//PUT /preguntas/:quizId

exports.actualizar = function(req, res) {

  req.quiz.pregunta = req.body.datos.pregunta;
  req.quiz.respuesta = req.body.datos.respuesta;
  req.quiz.tematica = req.body.datos.tematica;

  //guardar datos en las columnas pregunta y respuesta
  req.quiz
  .validate()//validar datos
  .then(function(err){
      //Si existen errores
      if (err) {
        res.render('preguntas/editar', {pregunta: req.quiz, errores: err.errors});
      }else {
        req.quiz
        .save({fields: ["pregunta", "respuesta","tematica"]})//se guardan los datos
        .then(function(){ res.redirect('/preguntas'); }) //se redirecciona
      }


    });

};

//DELETE /preguntas/:quizId

exports.eliminar = function(req, res) {

    req.quiz.destroy().then( function() {

        res.redirect('/preguntas');

    }).catch(function(error){next(error)});
};

// GET /preguntas/tematica

exports.tematica = function(req, res) {

  var tema = req.query.tematica;
  if (tema === "cualquier tematica") {
    var tema = ["otro","humanidades","ocio","ciencia","tecnologia"];
  }

  modelos.Preguntas.findAll({

      where: {
        tematica: tema
      }
  })
  .then(function (preguntas) {
    res.render('preguntas/tematica',{
        preguntas:preguntas,
        tema: req.query.tematica,
        errores: [],
      });
  })

};
