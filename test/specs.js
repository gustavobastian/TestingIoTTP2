let chai = require("chai");
let chaihttp = require("chai-http");
let should = chai.should();
let server = require("../app");

chai.use(chaihttp)


describe("juego de tateti", async ()=>{
    
    it("empieza juego nuevo",async()=>{
        chai.assert.fail("empezamos")

    })
})