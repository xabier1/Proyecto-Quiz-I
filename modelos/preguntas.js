//definicion del modelo (tabla) preguntas

module.exports = function(sequelize, DataTypes){

    return sequelize.define('Preguntas',
        {
            // las columnas que va a tener la tabla preguntas
            pregunta:{
              type: DataTypes.STRING,
              validate: { notEmpty: {msg: "-> Falta Pregunta"}}
            },
            respuesta:{
              type: DataTypes.STRING,
              validate: { notEmpty: {msg: "-> Falta Pregunta"}}
            },
            tematica:{
              type: DataTypes.STRING,
            }

        });
}
