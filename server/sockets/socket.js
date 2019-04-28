const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log('Ultimo ticket generado: #' + siguiente);
        callback(siguiente);

    });

    client.on('disponibles', (data, callback) => {
        let disponibles = ticketControl.getTicketsDisponibles();
        console.log('Tickets disponibles: ' + disponibles);
        callback(disponibles);
    });

    //emitir evento estadoActual debe retornar el ultimo ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4(),
        disponibles: ticketControl.getTicketsDisponibles()
    });


    client.on('atenderTicket', (data, callback) => {

        if (!data.taquilla) {
            return callback({
                err: true,
                mensaje: 'La taquilla es necesaria'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.taquilla);

        callback(atenderTicket);

        //Actualizar la pantalla pública a medida que se van asignando los tickets
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

        client.broadcast.emit('disponibles', {
            disponibles: ticketControl.getTicketsDisponibles()
        });


    });


});