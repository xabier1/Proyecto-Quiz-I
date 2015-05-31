// GET /preguntas/pregunta
exports.pregunta = function(req, res) {

  var plantilla = 'preguntas/pregunta';
  var pregunta = "¿Capital de Italia?";

  res.render(plantilla, { pregunta: pregunta});

};

// GET /preguntas/respuesta
exports.respuesta = function(req, res) {
  var respuesta_recibida = req.query.respuesta;
  var plantilla = 'preguntas/respuesta';
  var respuesta_enviada = undefined;
  if (respuesta_recibida === "Roma") {
    respuesta_enviada = "Correcto";
  }else {
    respuesta_enviada = "Incorrecto";
  }

  res.render(plantilla, { respuesta: respuesta_enviada});

};
