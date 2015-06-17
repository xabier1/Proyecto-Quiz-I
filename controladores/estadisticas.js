var n = require('./calculoEstadisticas');

// GET /estadisticas
exports.index = function(req, res) {

  //calculo de datos
  n.contadores.numeroPreguntasSinComentarios = n.contadores.numeroPreguntasTotales - n.contadores.numeroPreguntasConComentarios;
  n.contadores.numeroMedioDeComentariosPorPregunta = n.contadores.numeroComentariosTotales / n.contadores.numeroPreguntasTotales;

  res.render('estadisticas/index',{
    npt: n.contadores.numeroPreguntasTotales,
    nct: n.contadores.numeroComentariosTotales,
    npcc: n.contadores.numeroPreguntasConComentarios,
    npsc: n.contadores.numeroPreguntasSinComentarios,
    nmdcpp: n.contadores.numeroMedioDeComentariosPorPregunta.toFixed(2),
    errores:[]
  });

};
