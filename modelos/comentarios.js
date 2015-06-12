//definicion del modelo (tabla) preguntas

module.exports = function(sequelize, DataTypes){

    return sequelize.define('Comentarios',
        {
            // las columnas que va a tener la tabla preguntas
            comentario:{
              type: DataTypes.STRING,
              validate: { notEmpty: {msg: "-> Falta comentario"}}
            },
            activo:{
              type: DataTypes.BOOLEAN,
              defaultValue: false
            }

        });
}
