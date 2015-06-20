//cargamos los modelos

var modelos = require('../modelos/modelos.js');
var contadores = {};

//creamos las funciones

//numeroPreguntasTotales
contadores.f1 = function () {

    modelos.Preguntas.count()
    .then(function(c) {
      contadores.numeroPreguntasTotales = c;
      console.log("numeroPreguntasTotales = " + c);
    })



}

//numeroComentariosTotales
contadores.f2 = function() {

    modelos.Comentarios.count()
    .then(function(c) {
      contadores.numeroComentariosTotales = c;
      console.log("numeroComentariosTotales = " + c);
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
      console.log("numeroPreguntasConComentarios = " + contar.length);
    })


}



/*//ejecutamos las funciones


numeroPreguntasTotales();
numeroComentariosTotales();
numeroPreguntasConComentarios();*/

//Exportasmo modulos

module.exports.contadores = contadores;
