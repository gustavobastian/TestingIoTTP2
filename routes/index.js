var express = require('express');
var router = express.Router();

const marcas=['0','x'];

var estadoPizarra;
var turnoLocal;
var jugadores;
let marcaJugador;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Put empezar. */
router.put('/empezar', function(request, response) {
    jugadores=request.body;
    
    turnoLocal=jugadores[0]
    
    estadoPizarra=[
      [' ',' ',' '],
      [' ',' ',' '],
      [' ',' ',' ']
      ];
     
    response.setHeader('Content-Type', 'application/json')    
    .send({
    'turno': turnoLocal,
    'estado': estadoPizarra     
    })
    .status(200)
    
});

/* Put movimiento. */
router.put('/movimiento', function(request, response) {
  let columna=request.body.columna;
  let fila=request.body.fila;
  let respuesta={}
  //gestiono turnos  
  if(turnoLocal==request.body.jugador)
  {
    if (estadoPizarra[fila][columna]==" ")
    {
      if(request.body.jugador==jugadores[0])
      {
        turnoLocal=jugadores[1];    
        marcaJugador=marcas[1];
        estadoPizarra[fila][columna]=marcaJugador;  
        }
      else
      {
        turnoLocal=jugadores[0];
        marcaJugador=marcas[0];
        estadoPizarra[fila][columna]=marcaJugador;  
        }
    } 
  }
  let ganador=false;
  respuesta={}
  console.log(estadoPizarra)
  for (i=0;i<3;i++){
    if ((estadoPizarra[0][i]==estadoPizarra[1][i]) && (estadoPizarra[1][i]==estadoPizarra[2][i])&&(estadoPizarra[0][i]!=" ")){
      ganador=true;
    }  
    else if ((estadoPizarra[i][0]==estadoPizarra[i][1]) && (estadoPizarra[i][1]==estadoPizarra[i][2])&&(estadoPizarra[i][2]!=" ")){
      respuesta={gana:request.body.jugador,estado:estadoPizarra}
      ganador=true;
    }  
  }

  
  if (ganador==true)
        {
          respuesta={gana:request.body.jugador,estado:estadoPizarra}
        }
  else
        {
          respuesta={'turno' : turnoLocal, 'estado': estadoPizarra}   
        }
  
  response.setHeader('Content-Type', 'application/json');      
  response.send(respuesta).status(200);
});

module.exports = router;
