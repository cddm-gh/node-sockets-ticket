//Comando para establecer la comunicacion
var socket = io();
var label = $('#lblNuevoTicket');
var lblDisponibles = $('#lblDisponibles');

socket.on('connect', function() {
    console.log("Conectado al servidor.");

});

socket.on('disconnect', function() {
    console.log("Desconectado del servidor.");
});

socket.on('estadoActual', function(resp) {
    console.log(resp);
    label.text(resp.actual);
    lblDisponibles.text('Disponibles: ' + resp.disponibles);
});

socket.on('disponibles', function(resp) {
    lblDisponibles.text('Disponibles: ' + resp.disponibles);
});

$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

    socket.emit('disponibles', null, function(disponibles) {
        lblDisponibles.text('Disponibles: ' + disponibles);
    });
});