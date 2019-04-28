var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblTaquilla1 = $('#lblTaquilla1');
var lblTaquilla2 = $('#lblTaquilla2');
var lblTaquilla3 = $('#lblTaquilla3');
var lblTaquilla4 = $('#lblTaquilla4');

var lblTickets = [
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];
var lblTaquillas = [
    lblTaquilla1,
    lblTaquilla2,
    lblTaquilla3,
    lblTaquilla4
];

socket.on('estadoActual', function(data) {

    // console.log(data);
    actualizarHtml(data.ultimos4);
});

socket.on('ultimos4', function(data) {

    // console.log(data);
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

    actualizarHtml(data.ultimos4);
});

socket.on('disponibles', function(data) {

    actualizarDisponibles(data.disponibles);

});

function actualizarHtml(ultimos4) {

    for (let i = 0; i <= ultimos4.length - 1; i++) {

        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblTaquillas[i].text('Taquilla ' + ultimos4[i].taquilla);
    }
}

function actualizarDisponibles(disponibles) {
    $('#lblDisponibles').text('Disponibles: ' + disponibles);
}