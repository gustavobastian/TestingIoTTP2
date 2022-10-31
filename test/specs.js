let chai = require("chai");
let chaihttp = require("chai-http");
let should = chai.should();
let server = require("../app");

chai.use(chaihttp)


/*

1-En un juego nuevo el tablero esta vacio y mueve el primer jugador \
2-completar una casilla, el tablero tiene una casilla ocupada y le toca al segundo jugador \
3-completar una casilla, el tablero tiene 2 casillas ocupada y le toca al priemr jugador\
4-no debe aceptar movimientos de jugadores que no le corresponden \
5-si un jugador quiere marcar una posicion tiene un error y sigue su tiempo de mover \
6-si 3 filas tienen la marca de un mismo jugador gano \
7-si 3 columnas tienen la marca de un mismo jugador gano\
8-si una diagonal tiene la marca de un mismo jugador gano\
9-si no hay mas espacios en el tablero es empate
*/




describe("juego de tateti", async ()=>{
    
    it("empieza juego nuevo",async()=>{
        chai.assert.fail("empezamos")

    })
})