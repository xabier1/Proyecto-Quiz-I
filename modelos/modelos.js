//Definicion de los modelos

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);


/*//usar BBDD sqlite
var sequelize = new Sequelize (null, null, null,{
  dialect:"sqlite", storage:"preguntas.sqlite"
});*/

//importar la definicion de la tabla Preguntas en preguntas.js
var Preguntas = sequelize.import(path.join(__dirname,'preguntas'));

//exportar la definicion de la tabla Preguntas
exports.Preguntas = Preguntas;

//sequelize.sync() crea y iniciliaza tabla de preguntas en DB
sequelize.sync().then(function() {
      //then(...) ejecuta el manejador una vez creada la tabla
      Preguntas.count().then(function(count){
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
