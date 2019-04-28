const fs = require('fs');

class Ticket {

    constructor(numero, taquilla) {

        this.numero = numero;
        this.taquilla = taquilla;

    }
}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []; //todos los tickets disponibles
        this.ultimos4 = []; //ultimos 4 atendidos
        this.disponibles = 0;

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
            this.disponibles = data.disponibles;
        } else {
            //Un día nuevo, reinicio los tickets
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {

        this.ultimo += 1;
        this.disponibles += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();

        return `Ticket-> ${this.ultimo}`;
    }

    getUltimoTicket() {

        return `Ticket-> ${this.ultimo}`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    getTicketsDisponibles() {

        return this.disponibles;
    }

    atenderTicket(taquilla) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //elimina el primer elemento
        this.disponibles -= 1; //restar 1 ticket disponible porque ya está siendo atendido

        let atenderTicket = new Ticket(numeroTicket, taquilla);

        this.ultimos4.unshift(atenderTicket); //Agrega al inicio del arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //Elimina el ultimo elemento
        }
        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.disponibles = 0;
        this.grabarArchivo();
        console.log("Se ha iniciado el sistema de tickets.");

    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
            disponibles: this.disponibles

        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }
}


module.exports = {
    TicketControl
}