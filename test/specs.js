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
*si un jugador quiere marcar una posicion ocupada tiene un error y sigue su tiempo de mover  
*si 3 filas tienen la marca de un mismo jugador gano 
*si 3 columnas tienen la marca de un mismo jugador gano
*si una diagonal tiene la marca de un mismo jugador gano
*si no hay mas espacios en el tablero es empate
*/



describe("juego de tateti", async ()=>{ 
    let movimientos = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 0, fila: 1 },
        { jugador: 'Pedro', columna: 1, fila: 1 },
        { jugador: 'Juan', columna: 0, fila: 2 },
        { jugador: 'Pedro', columna: 0, fila: 0 },
    ];
    let juego = ['Juan','Pedro'];
            
    describe("empieza juego nuevo", async()=>{

        it ("Todos los casilleros estan vacios", (done)=>{
            
            chai.request(server)
            .put("/empezar")
            .send(juego)
            .end((err,res)=>{
                res.should.have.status(200);            
                res.should.to.be.json;       
                res.should.to.be.a('object');  
                res.body.should.have.property('turno').eql('Juan');
                res.body.should.have.property('estado').eql([
                    [' ',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                ]);
                done();
            })
        })
        
        it ("Le toca mover al primer jugador",(done)=>{
            /*let juego = {
                jugadores: ['Juan','Pedro']
            }*/
            
            chai.request(server)
            .put("/empezar")
            .send(juego)
            .end((err,res)=>{            
                res.should.have.status(200);            
                res.should.to.be.json;    
                res.should.to.be.a('object');     
                res.body.should.have.property('turno').eql('Juan');
                res.body.should.have.property('estado').eql([
                    [' ',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                ]);
                done();
            })
        })

        
    })

    describe(" movimientos", ()=>{
        
        it ("El casillero queda ocupado y le toca al otro jugador", (done)=>{
            chai.request(server).put("/empezar").send(juego).end();            
            chai.request(server)
            .put("/movimiento")
            .send(movimientos[0])
            .end((err,res)=>{
                res.should.have.status(200);            
                res.should.to.be.json;     
                res.should.to.be.a('object');    
                res.body.should.have.property('turno').eql('Pedro');
                res.body.should.have.property('estado').eql([
                    ['x',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                ]);
                done()
            })
        })
        it ("completar una casilla, el tablero tiene dos casillas ocupada y le toca al primer jugador", (done)=>{
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos[0]).end();
            chai.request(server)
            .put("/movimiento")
            .send(movimientos[1])
            .end((err,res)=>{
                res.should.have.status(200);            
                res.should.to.be.json;     
                res.should.to.be.a('object');                    
                res.body.should.have.property('turno').eql('Juan');
                res.body.should.have.property('estado').eql([
                    ['x','0',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                ]);
                done();
            })
        })

        it ("no debe aceptar movimientos de jugadores que no le corresponden ", (done)=>{
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos[0]).end();
            chai.request(server)
            .put("/movimiento")
            .send(movimientos[2])
            .end((err,res)=>{
                res.should.have.status(200);            
                res.should.to.be.json;     
                res.should.to.be.a('object');                    
                res.body.should.have.property('turno').eql('Pedro');
                res.body.should.have.property('estado').eql([
                    ['x',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                ]);
                done();
            })
        })

        it ("si un jugador quiere marcar una posicion ocupada tiene un error y sigue su tiempo de mover ", (done)=>{
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos[0]).end();
            chai.request(server)
            .put("/movimiento")
            .send(movimientos[5])
            .end((err,res)=>{
                res.should.have.status(200);            
                res.should.to.be.json;    
                res.should.to.be.a('object');                     
                res.body.should.have.property('turno').eql('Pedro');
                res.body.should.have.property('estado').eql([
                    ['x',' ',' '],
                    [' ',' ',' '],
                    [' ',' ',' '],
                ]);
                done();
            })
        })

    })
    describe(" el primer jugador gana la partida", ()=>{

        it("el juego termina cuando hay 3 valores iguales",(done)=>{
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos[0]).end();
            chai.request(server).put("/movimiento").send(movimientos[1]).end();
            chai.request(server).put("/movimiento").send(movimientos[2]).end();
            chai.request(server).put("/movimiento").send(movimientos[3]).end();
            chai.request(server).put("/movimiento").send(movimientos[4])
            .end((err,res)=>{
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('turno').eql('Pedro');
                res.body.should.have.property('estado').eql([
                    ['x','0',' '],
                    ['x','0',' '],
                    ['x',' ',' '],
                ]);
                done();
            })



        })

    })
})

