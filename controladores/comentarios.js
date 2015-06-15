//cargamos los modelos

var modelos = require('../modelos/modelos.js');

//Autoload Id comentarios (:commentId)

exports.load = function(req, res, next, commentId) {

  modelos.Comentarios.find({
            where: {
                id: Number(commentId)
            }
  })
  .then(function(comment) {
      if (comment) {
        req.comentario = comment;
        next();
      } else{next(new Error('No existe commentId=' + commentId))}
  })
  .catch(function(error){
    next(error);
  });

}

// GET /preguntas/:quizId(\\d+)/comentarios/nuevo

exports.nuevo = function(req, res) {

    res.render('comentarios/nuevo', {pregunta: req.params.quizId, errores:[]});

};

// POST /preguntas/:quizId(\\d+)/comentarios

exports.crear = function(req, res) {

  modelos.Preguntas.findAll().then(function(Preguntas){
      //se prepara para guardar los datos en la base de datos--> columna:valor a guardar
      var comentario = modelos.Comentarios.build({
        comentario: req.body.comentario.texto,
        PreguntaId: req.params.quizId
      });

      //se intenta guardar los datos en la base de datos
      comentario
        .validate()
        .then(function(err) {
            if (err) {
                res.render('comentarios/nuevo', {
                    preguntasId: req.params.quizId,
                    comentario:comentario,
                    errores:[]
                })
            } else {
                //se guardan los datos
                comentario
                  .save()
                  .then(function(){
                      //se redirecciona
                      res.redirect('/preguntas/' + req.params.quizId);
                  })
            }
        })
        .catch(function(error) {
            next(error);
        })

  });

};

//GET /preguntas/:quizId(\\d+)/comentarios/:commentId(\\d+)/publicar

exports.publicar = function(req, res) {

  req.comentario.publicar = true;

  //se actualizan los datos
  req.comentario
  .save( {
    fields: ["publicar"]
  })
  .then( function(){
    res.redirect('/preguntas/'+ req.params.quizId);
  })
  .catch(function(error){
    next(error)
  });

};
