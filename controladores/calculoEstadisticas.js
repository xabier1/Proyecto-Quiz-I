//cargamos los modelos

var modelos = require('../modelos/modelos.js');
var contadores = {};

//creamos las funciones
function numeroPreguntasTotales () {

    modelos.Preguntas.count()
    .then(function(c) {
      contadores.numeroPreguntasTotales = c;
    })



}

function numeroComentariosTotales () {

    modelos.Comentarios.count()
    .then(function(c) {
      contadores.numeroComentariosTotales = c;
    })



}


function numeroPreguntasConComentarios () {

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
    })


}



//ejecutamos las funciones


numeroPreguntasTotales();
numeroComentariosTotales();
numeroPreguntasConComentarios();

//Exportasmo modulos

module.exports.contadores = contadores;
