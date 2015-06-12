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

//importar la definicion de cada tabla
var Preguntas = sequelize.import(path.join(__dirname,'preguntas'));
var Comentarios = sequelize.import(path.join(__dirname,'comentarios'));

//relaciones entre las tablas
Comentarios.belongsTo(Preguntas);//indica que un comentario pertenece a una pregunta
Preguntas.hasMany(Comentarios);//indica que una pregunta puede tener muchos comentarios

//exportar la definicion de la tablas
exports.Preguntas = Preguntas;
exports.Comentarios = Comentarios;

//sequelize.sync() crea y iniciliaza tabla de preguntas en DB
sequelize.sync().then(function() {
      //then(...) ejecuta el manejador una vez creada la tabla
      Preguntas.count().then(function(count){
          //la tabla solo se inicializa si esta vacia
          if (count === 0) {
              Preguntas.create({
                  pregunta: 'Capital de Italia',
                  respuesta: 'Roma',
                  tematica: 'otro'
              });
              Preguntas.create({
                  pregunta: 'Capital de Portugal',
                  respuesta: 'Lisboa',
                  tematica: 'otro'
              })
              .then(function(){
                  console.log('Base de datos inicializada');
              });
          }
      })
})
