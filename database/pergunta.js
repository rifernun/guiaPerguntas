const sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta', { //CREATE TABLE pergunta (titulo string, descricao )
    titulo: {
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {}); //if ALREADY EXISTS, nao cria.

module.exports = Pergunta;