//Comando para establecer la comunicacion
var socket = io();
var urlParams = new URLSearchParams(window.location.search);
var ntaquilla = $('#ntaquilla');
var label = $('small');

var taquilla = urlParams.get('taquilla');
ntaquilla.text(taquilla);

if (!urlParams.has('taquilla')) {
    window.location = 'index.html';
    throw new Error('La taquilla es necesaria');
}

socket.on('connect', function() {
    console.log(`Taquilla conectada al servidor.`);

});

socket.on('disconnect', function() {
    console.log("Taquilla desconectada del servidor.");
});

$('button').on('click', function() {
    socket.emit('atenderTicket', { taquilla: taquilla }, function(resp) {
        if (resp === 'No hay tickets') {
            label.text(resp);
            console.log(resp.ultimos4);
            return;

        }
        label.text(`Atendiendo a Ticket #${resp.numero}`);

    });
});