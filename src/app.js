const express = require('express');
const { Socket } = require('socket.io');
const app = express();

//Crea un servidor HTTP a partir de la librería "Express"
const http = require('http').Server(app);

//Generar una comunicación se usa socket.io
const io = require('socket.io')(http);

//Rutas
app.use(require('./routes/SOProyecto.routes'));

//Para carga los HTML que estaremos usando
app.use(express.static(__dirname +"/public"));

//Genera canal de comunicación dentro del servidor
io.on('connection',(socket)=>{
    socket.on('stream',(image)=>{
        //Emitir el evento a todos los sockets conectados
        socket.broadcast.emit('stream', image);
    })
})


module.exports=http;