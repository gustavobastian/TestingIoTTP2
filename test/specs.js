let chai = require("chai");
let chaihttp = require("chai-http");
let should = chai.should();
let server = require("../app");

chai.use(chaihttp)

describe("juego de tateti", async ()=>
{ 
    let movimientos = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 0, fila: 1 },
        { jugador: 'Pedro', columna: 1, fila: 1 },
        { jugador: 'Juan', columna: 0, fila: 2 },
        { jugador: 'Pedro', columna: 0, fila: 0 },
    ];
    let juego = ['Juan','Pedro'];
            
    describe("empieza juego nuevo", async()=>
    {

        it ("Todos los casilleros estan vacios", (done)=>
        {
            
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
        
        it ("Le toca mover al primer jugador",(done)=>
        {
                        
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

    describe(" movimientos", ()=>
    {
        
        it ("El primer jugador mueve, el casillero queda ocupado y le toca al otro jugador", (done)=>
        {
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
        it ("Mueve el 1er jugador, luego el segundo, el tablero tiene dos casillas ocupada y le toca al primer jugador", (done)=>
        {
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos[0]).end();
            chai.request(server)
            .put("/movimiento")
            .send(movimientos[1])
            .end((err,res)=>
            {
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

        it ("Mueve un jugador cuyo turno no corresponde", (done)=>
        {
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos[0]).end();
            chai.request(server)
            .put("/movimiento")
            .send(movimientos[2])
            .end((err,res)=>
            {
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

        it ("Un jugador quiere marcar una posicion ocupada, tiene un error y sigue su tiempo de mover ", (done)=>
        {
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

    describe("Distintas opciones de finalización", ()=>
    {
        it("el juego termina cuando hay 3 marcas del mismo jugador en columna 1",(done)=>
        {
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos[0]).end();
            chai.request(server).put("/movimiento").send(movimientos[1]).end();
            chai.request(server).put("/movimiento").send(movimientos[2]).end();
            chai.request(server).put("/movimiento").send(movimientos[3]).end();
            chai.request(server).put("/movimiento").send(movimientos[4])
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('gana').eql('Juan');
                res.body.should.have.property('estado').eql([
                    ['x','0',' '],
                    ['x','0',' '],
                    ['x',' ',' '],
                ]);
                done();
            })
        })

        it("el juego termina cuando hay 3 marcas del mismo jugador en columna 2",(done)=>
        {
            let movimientos_2 = [
                { jugador: 'Juan', columna: 2, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 0 },
                { jugador: 'Juan', columna: 2, fila: 1 },
                { jugador: 'Pedro', columna: 1, fila: 1 },
                { jugador: 'Juan', columna: 2, fila: 2 },
                { jugador: 'Pedro', columna: 0, fila: 0 },
            ];
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos_2[0]).end();
            chai.request(server).put("/movimiento").send(movimientos_2[1]).end();
            chai.request(server).put("/movimiento").send(movimientos_2[2]).end();
            chai.request(server).put("/movimiento").send(movimientos_2[3]).end();
            chai.request(server).put("/movimiento").send(movimientos_2[4])
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('gana').eql('Juan');
                res.body.should.have.property('estado').eql([
                    [' ','0','x'],
                    [' ','0','x'],
                    [' ',' ','x'],
                ]);
                done();
            })
        })    

        it("el juego termina cuando hay 3  marcas del mismo jugador en fila 1",(done)=>
        {
            let movimientos_3 = [
                { jugador: 'Juan', columna: 0, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 2 },
                { jugador: 'Juan', columna: 1, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 1 },
                { jugador: 'Juan', columna: 2, fila: 0 },
                { jugador: 'Pedro', columna: 0, fila: 1 },
            ];
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos_3[0]).end();
            chai.request(server).put("/movimiento").send(movimientos_3[1]).end();
            chai.request(server).put("/movimiento").send(movimientos_3[2]).end();
            chai.request(server).put("/movimiento").send(movimientos_3[3]).end();
            chai.request(server).put("/movimiento").send(movimientos_3[4])
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('gana').eql('Juan');
                res.body.should.have.property('estado').eql([
                    ['x','x','x'],
                    [' ','0',' '],
                    [' ','0',' '],
                ]);
                done();
                })
            })

        it("el juego termina cuando hay 3  marcas del mismo jugador en fila 2",(done)=>
        {
                let movimientos_4 = [
                    { jugador: 'Juan', columna: 0, fila: 0 },
                    { jugador: 'Pedro', columna: 1, fila: 1 },
                    { jugador: 'Juan', columna: 1, fila: 0 },
                    { jugador: 'Pedro', columna: 0, fila: 1 },
                    { jugador: 'Juan', columna: 2, fila: 2 },
                    { jugador: 'Pedro', columna: 2, fila: 1 },
                ];
                chai.request(server).put("/empezar").send(juego).end();
                chai.request(server).put("/movimiento").send(movimientos_4[0]).end();
                chai.request(server).put("/movimiento").send(movimientos_4[1]).end();
                chai.request(server).put("/movimiento").send(movimientos_4[2]).end();
                chai.request(server).put("/movimiento").send(movimientos_4[3]).end();
                chai.request(server).put("/movimiento").send(movimientos_4[4]).end();
                chai.request(server).put("/movimiento").send(movimientos_4[5])
                .end((err,res)=>
                {
                    res.should.have.status(200);            
                    res.should.to.be.json;                       
                    res.should.to.be.a('object');              
                    res.body.should.have.property('gana').eql('Pedro');
                    res.body.should.have.property('estado').eql([
                        ['x','x',' '],
                        ['0','0','0'],
                        [' ',' ','x'],
                    ]);
                    done();
                })
            
            })
          

        it("el juego termina cuando hay 3  marcas del mismo jugador en diagonal 1",(done)=>
        {
            let movimientos_4 = [
                { jugador: 'Juan', columna: 0, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 0 },
                { jugador: 'Juan', columna: 1, fila: 1 },
                { jugador: 'Pedro', columna: 0, fila: 1 },
                { jugador: 'Juan', columna: 2, fila: 2 },
                { jugador: 'Pedro', columna: 2, fila: 1 },
            ];
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos_4[0]).end();
            chai.request(server).put("/movimiento").send(movimientos_4[1]).end();
            chai.request(server).put("/movimiento").send(movimientos_4[2]).end();
            chai.request(server).put("/movimiento").send(movimientos_4[3]).end();
            chai.request(server).put("/movimiento").send(movimientos_4[4])            
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('gana').eql('Juan');
                res.body.should.have.property('estado').eql([
                    ['x','0',' '],
                    ['0','x',' '],
                    [' ',' ','x'],
                ]);
                done();
            })
        
        })
        it("el juego termina cuando hay 3  marcas del mismo jugador en diagonal 2",(done)=>
        {
            let movimientos_4 = [
                { jugador: 'Juan', columna: 2, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 0 },
                { jugador: 'Juan', columna: 1, fila: 1 },
                { jugador: 'Pedro', columna: 0, fila: 1 },
                { jugador: 'Juan', columna: 0, fila: 2 },
                { jugador: 'Pedro', columna: 2, fila: 1 },
            ];
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos_4[0]).end();
            chai.request(server).put("/movimiento").send(movimientos_4[1]).end();
            chai.request(server).put("/movimiento").send(movimientos_4[2]).end();
            chai.request(server).put("/movimiento").send(movimientos_4[3]).end();
            chai.request(server).put("/movimiento").send(movimientos_4[4])            
            .end((err,res)=>{
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('gana').eql('Juan');
                res.body.should.have.property('estado').eql([
                    [' ','0','x'],
                    ['0','x',' '],
                    ['x',' ',' '],
                ]);
                done();
            })
        
        })
        it("Juego termina con empate ",(done)=>
        {
            let movimientos_5 = [
                { jugador: 'Juan', columna: 0, fila: 0 },
                { jugador: 'Pedro', columna: 1, fila: 0 },
                { jugador: 'Juan', columna: 2, fila: 0 },
                { jugador: 'Pedro', columna: 0, fila: 1 },
                { jugador: 'Juan', columna: 1, fila: 1 },
                { jugador: 'Pedro', columna: 2, fila: 1 },
                { jugador: 'Juan', columna: 0, fila: 2 },
                { jugador: 'Pedro', columna: 1, fila: 2 },
                { jugador: 'Juan', columna: 2, fila: 2 },
                
            ];
            chai.request(server).put("/empezar").send(juego).end();
            chai.request(server).put("/movimiento").send(movimientos_5[0]).end();
            chai.request(server).put("/movimiento").send(movimientos_5[1]).end();
            chai.request(server).put("/movimiento").send(movimientos_5[2]).end();
            chai.request(server).put("/movimiento").send(movimientos_5[3]).end();
            chai.request(server).put("/movimiento").send(movimientos_5[4]).end();
            chai.request(server).put("/movimiento").send(movimientos_5[5]).end();
            chai.request(server).put("/movimiento").send(movimientos_5[6]).end();
            chai.request(server).put("/movimiento").send(movimientos_5[7]).end();
            chai.request(server).put("/movimiento").send(movimientos_5[8])            
            .end((err,res)=>
            {
                res.should.have.status(200);            
                res.should.to.be.json;                       
                res.should.to.be.a('object');              
                res.body.should.have.property('empate').eql('empate');
                res.body.should.have.property('estado').eql([
                    ['x','0','x'],
                    ['0','x','0'],
                    ['x','0','x'],
                ]);
                done();
            })
        
        })
    })      
})

