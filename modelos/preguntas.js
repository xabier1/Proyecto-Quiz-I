//definicion del modelo (tabla) preguntas

module.exports = function(sequelize, DataTypes){

    return sequelize.define('Preguntas',
        {
            // las columnas que va a tener la tabla preguntas
            pregunta:  DataTypes.STRING,
            respuesta: DataTypes.STRING,

        });
}
