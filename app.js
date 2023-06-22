const express = require('express')
// require('./services/expo-notificaciones/expo');

const cliente = require('./cliente.json').length
const aesor = require('./asesor.json').length
console.log(cliente);
console.log(aesor);

const app = express();

app.listen(2001 , ()=>{
    console.log('listening on http://localhost:2000')
})