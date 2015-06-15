// Get /login   -- Formulario de login
exports.nuevo = function(req, res) {
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('sesiones/nuevo', {errores: errors});
};

// POST /login   -- Crear la sesion si usuario se autentica
exports.crear = function(req, res) {

    var login     = req.body.login;
    var password  = req.body.password;

    var user = require('./usuarios');
    user.autenticar(login, password, function(error, user) {

        if (error) {  // si hay error retornamos mensajes de error de sesión
            req.session.errors = [{"message": 'Se ha producido un error: '+error}];
            res.redirect("/login");
            return;
        }

        // Crear req.session.user y guardar campos   id  y  username
        // La sesión se define por la existencia de:    req.session.user
        req.session.user = {id:user.id, username:user.username, isAdmin:user.isAdmin};

        res.redirect(req.session.redir.toString());// redirección a path anterior a login
    });
};

// DELETE /login   -- Destruir sesion
exports.eliminar = function(req, res) {
    //eliminar la sesion
    delete req.session.user;
    //redireccionar
    res.redirect(req.session.redir.toString()); // redirect a path anterior a login
};
