async = require ('async');
var modelos = require('../modelos/modelos.js');
var contadores;
// GET /estadisticas
exports.index = function(req, res, next) {


  //calcular los datos de modo asyncrono
  async.auto({
      //numeroPreguntasTotales
      numeroPreguntasTotales: function(callback){
            modelos.Preguntas.count()
            .then(function(c1) {
               callback(null,c1);
            })
            .catch(function(error) {
                next(error);
            })
      },
      //numeroComentariosTotales
      numeroComentariosTotales: function(callback){
            modelos.Comentarios.count()
            .then(function(c2) {
              callback(null,c2);
            })
            .catch(function(error) {
                next(error);
            })
      },
      //numeroPreguntasConComentarios
      numeroPreguntasConComentarios: function(callback){
            modelos.Preguntas.findAll({
              include:[{
                all:true,
                where:{
                  publicar:{
                    $in:[true,false]
                  }
                }
              }]
            })
            .then(function(c3) {
              var contar = [],i;
              for(i in c3){
                    //El resultado lo guardamos en un array
                    contar[i] = c3[i];
              }

              callback(null,contar.length);
            })
            .catch(function(error) {next(error);})

        },
        calcular:[
          'numeroPreguntasTotales',
          'numeroComentariosTotales',
          'numeroPreguntasConComentarios',
          function(callback,results){
              //se ejecutan las funciones y se guardan los valores en contadores
              contadores = results;

              //calculo de datos
              contadores.numeroPreguntasSinComentarios = contadores.numeroPreguntasTotales - contadores.numeroPreguntasConComentarios;
              contadores.numeroMedioDeComentariosPorPregunta = contadores.numeroComentariosTotales / contadores.numeroPreguntasTotales;

              //preparamos la respuesta
              var respuesta = {
                npt: contadores.numeroPreguntasTotales,
                nct: contadores.numeroComentariosTotales,
                npcc: contadores.numeroPreguntasConComentarios,
                npsc: contadores.numeroPreguntasSinComentarios,
                nmdcpp: contadores.numeroMedioDeComentariosPorPregunta.toFixed(2),
                errores:[]
              } ;

              // se envian los datos a la vista
              res.render('estadisticas/index',respuesta);
              //console.log('contadores = ', contadores);


              callback(null);
          }
        ]
  }, function(err, results) {
      //detectamos errores
      if (err == null) {
        new Error('Ha ocurrido un error. No se puede calcular las estadísticas.');
      }
      //console.log('err = ', err);
      //console.log('resultados = ', contadores);
  });

};
