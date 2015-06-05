//Definicion de los modelos

var path = require('path');

//cargar modelo ORM
var Sequelize = require('sequelize');

//usar BBDD sqlite
var sequelize = new Sequelize (null, null, null,{
  dialect:"sqlite", storage:"preguntas.sqlite"
});

//importar la definicion de la tabla Preguntas en preguntas.js
var Preguntas = sequelize.import(path.join(__dirname,'preguntas'));

//exportar la definicion de la tabla Preguntas
exports.Preguntas = Preguntas;

//sequelize.sync() crea y iniciliaza tabla de preguntas en DB
sequelize.sync().success(function() {
      //success(...) ejecuta el manejador una vez creada la tabla
      Preguntas.count().success(function(count){
          //la tabla solo se inicializa si esta vacia
          if (count === 0) {
              Preguntas.create({
                  pregunta: 'Capital de Italia',
                  respuesta: 'Roma'
              });
              Preguntas.create({
                  pregunta: 'Capital de Portugal',
                  respuesta: 'Lisboa'
              })
              .success(function(){
                  console.log('Base de datos inicializada');
              });
          }
      })
})
