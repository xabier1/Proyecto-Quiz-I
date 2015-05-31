//configuracion de la app
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//variables para el enrutamiento
var rutas = require('./rutas/index');
var sesiones = require('./rutas/sesiones');
var preguntas = require('./rutas/preguntas');
var comentarios = require('./rutas/comentarios');

//se inicia la app
var app = express();

// configuración de las plantillas
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'ejs');

// descomentar para el uso de favicon en la carpeta public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rutas
app.use('/', rutas);//pagina principal
app.use('/login', sesiones);//gestion de las sesiones de los usuarios
app.use('/preguntas', preguntas);//gestion de las preguntas
app.use('/comentarios', comentarios);//gestion de los comentarios


// crea un error y lo pasa al siguiente middleware
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
      error: err
    });
  });
}

// Imprime error si estamos em modo produción ( no mostrando datos del error)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
