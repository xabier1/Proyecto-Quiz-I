//configuracion de la app
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require ('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');
//capacidad para trabjar con el sistema de ficheros de node
var FileStreamRotator = require('file-stream-rotator')
var fs = require('fs');
// create a write stream (in append mode)
//var logss = fs.createWriteStream(__dirname + '/logs/accesos.log', {flags: 'a'})
var logCarpeta = __dirname + '/logs' ;
// ensure log directory exists
fs.existsSync(logCarpeta) || fs.mkdirSync(logDirectory);
// create a rotating write stream
var logss = FileStreamRotator.getStream({
  filename: logCarpeta + '/access-%DATE%.log',
  frequency: 'daily',
  verbose: false
})
//variables para el enrutamiento
var rutas = require('./rutas/index');

//se inicia la app
var app = express();


// configuración de las plantillas
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'ejs');
//para poder usar plantillas parciales
app.use(partials());

//uso de favicon en la carpeta public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('combined', {stream: logss}));//config. de los logs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('dfsdffgasfdsaf546'));//se cifran las cookies con 'dfsdffgasfdsaf546'
app.use(session());//instalamos sesiones
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// middleware para el autologout
app.use(function (req, res, next) {

  //si no existe el tiempo de la sesion se crea uno
  var ahora = new Date().getTime();

  if (req.session.inicio === undefined) {
    req.session.inicio = ahora;
  }

  //se calcula la diferencia entre las 2 fechas
   var duracion = ahora - req.session.inicio;

  //si la duracion supera los dos minutos las sesion se elimina
  var tiempo = 2*60*1000; //el tiempo en milisegundos (2 minutos)
  if (duracion > tiempo) {
    //se elimina la variable inicio de la sesion
    delete req.session.inicio;
    // si existe este usuario ha iniciado session, se elimina su session de usuario
    if (req.session.user) {
      delete req.session.user;
    }
  } else {
    //se actualiza los datos
    req.session.inicio = ahora;
  }


  next();
})

// Helpers dinamicos: para el uso de las sesiones
app.use(function(req, res, next) {

  // si no existe lo inicializa
  if (!req.session.redir) {
    req.session.redir = '/';
  }
  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout|\/user/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();

});

//rutas
app.use('/', rutas);

// crea un error y lo pasa al siguiente middleware
app.use(function(req, res, next) {
  var err = new Error('La página web que intentas visitar no existe.');
  err.status = 404;
  next(err);
});

// error handlers

// Imprime error si estamos em modo desarrollo (mostrando datos del error)
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errores:[]
    });
  });
}

// Imprime error si estamos em modo produción ( no mostrando datos del error)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errores:[]
  });
});


module.exports = app;
