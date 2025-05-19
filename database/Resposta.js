const sequelize = require('sequelize');
const connection = require('./database');
const { text } = require('body-parser');

const Resposta = connection.define("respostas", {
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaID: {
        type: sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});

module.exports = Resposta;