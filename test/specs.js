let chai = require("chai");
let chaihttp = require("chai-http");
let should = chai.should();
let server = require("../app");

chai.use(chaihttp)


/*
*En un juego nuevo el tablero esta vacio y mueve el primer jugador 
*completar una casilla, el tablero tiene una casilla ocupada y le toca mover al segundo jugador 
*completar una casilla, el tablero tiene dos casillas ocupada y le toca al primer jugador
*no debe aceptar movimientos de jugadores que no le corresponden 
*si 3 filas tienen la marca de un mismo jugador gano 
*si 3 columnas tienen la marca de un mismo jugador gano
*si una diagonal tiene la marca de un mismo jugador gano
*si no hay mas espacios en el tablero es empate
*si un jugador quiere marcar una posicion ocupada tiene un error y sigue su tiempo de mover 
*/




describe("juego de tateti", async ()=>{
    
    
    describe("empieza juego nuevo", async()=>{
        let juego = {
            jugadores: ['Juan','Pedro']
        }
        
        it ("Le toca mover al primer jugador", async()=>{
            
            res=  await chai.request(server).put("/empezar").send(juego);
            res.should.have.status(200);
            res.body.should.have.property('turno').equal('Juan');
            
            
        })

    })

    


})