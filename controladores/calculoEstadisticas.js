async = require ('async');
//cargamos los modelos

var modelos = require('../modelos/modelos.js');
var contadores = {};

//creamos las funciones y se ejecutan de modo asyncrona

async.auto({
    f1: function(callback){
          modelos.Preguntas.count()
          .then(function(c1) {
            contadores.numeroPreguntasTotales = c1;
            //console.log("numeroPreguntasTotales = " + c1);
             callback(null,c1);
          })
    },
    f2: function(callback){
          modelos.Comentarios.count()
          .then(function(c2) {
            contadores.numeroComentariosTotales = c2;
            //console.log("numeroComentariosTotales = " + c2);
            callback(null,c2);
          })
    },
    f3: function(callback){
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
                //}
            }
            contadores.numeroPreguntasConComentarios = contar.length;
            //console.log("numeroPreguntasConComentarios = " + contar.length);
            callback(null,contar.length);

      },
      calcular:['f1','f2','f3',function(callback,results){
        console.log('ejecutando funciones');
        // once there is some data and the directory exists,
        // write the data to a file in the directory
        callback(null);
      }]
}, function(err, results) {
    console.log('err = ', err);
    console.log('results = ', results);
});

/*//numeroPreguntasTotales
contadores.f1 = function () {

    modelos.Preguntas.count()
    .then(function(c) {
      contadores.numeroPreguntasTotales = c;
      //console.log("numeroPreguntasTotales = " + c);
    })



}

//numeroComentariosTotales
contadores.f2 = function() {

    modelos.Comentarios.count()
    .then(function(c) {
      contadores.numeroComentariosTotales = c;
      //console.log("numeroComentariosTotales = " + c);
    })



}

//numeroPreguntasConComentarios
contadores.f3 = function () {

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
    .then(function(c) {
      var contar = [],i;
      for(i in c){
            //El resultado lo guardamos en un array
            contar[i] = c[i];
          //}
      }
      contadores.numeroPreguntasConComentarios = contar.length;
      //console.log("numeroPreguntasConComentarios = " + contar.length);
    })


}*/



/*//ejecutamos las funciones


numeroPreguntasTotales();
numeroComentariosTotales();
numeroPreguntasConComentarios();*/

//Exportasmo modulos

module.exports.contadores = contadores;
