let express = require('express');
let router = express.Router();

const marcas=['0','x'];

let pizarraSt;
let turnoLocal;
let jugadores;
let marcaJugador;
let movimientos;
let ganador=false;
let empate=false;


function buscarGanador()
{
    for (let i=0;i<3;i++)
    {
      if (checkColumna(i) || checkFila(i))
      {
        ganador=true;
        return;
      }
    }
    if (checkDiagonal())
    {
      ganador=true;      
    }  
}

function checkDiagonal()
{  
  if (pizarraSt[0][0]==pizarraSt[1][1]) 
  {
    if (pizarraSt[2][2]==pizarraSt[1][1]) 
    {
      if (pizarraSt[0][0]!=" ")
      {
        return true;
      }
    }  
  }  
  if (pizarraSt[0][2]==pizarraSt[1][1]) 
  {
    if (pizarraSt[2][0]==pizarraSt[1][1])
    {
      if (pizarraSt[1][1]!=" ")
      {
        return true;
      }
    }    
  }    
  return false;
}

function checkColumna(col)
{  
  if (pizarraSt[0][col]==pizarraSt[1][col]) 
  {
    if (pizarraSt[1][col]==pizarraSt[2][col])
    {
      if(pizarraSt[0][col]!=" ")
      {
        return true;
      }
    }
  }  
  return false;
}

function checkFila(fil)
{
  
  if (pizarraSt[fil][0]==pizarraSt[fil][1]) 
  {
    if (pizarraSt[fil][1]==pizarraSt[fil][2])
    {
      if(pizarraSt[fil][0]!=" ")
      {
        return true;
      }
    }
  }  
  return false;
}


router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Express' });
});


router.put('/empezar', function(request, response) 
{
  jugadores=request.body;
  movimientos=9;
  turnoLocal=0
  ganador=false;
  empate=false;
  pizarraSt=[
    [' ',' ',' '],
    [' ',' ',' '],
    [' ',' ',' ']
    ];
     
  response.setHeader('Content-Type', 'application/json')    
  .send({
  'turno': jugadores[turnoLocal],
  'estado': pizarraSt     
  })
  .status(200)    
});


router.put('/movimiento', function(request, response) 
{
  let columna=request.body.columna;
  let fila=request.body.fila;
  let respuesta={}  

  if(jugadores[turnoLocal]==request.body.jugador)
  {
    if (pizarraSt[fila][columna]==" ")
    {
      movimientos= movimientos-1;      
      if(request.body.jugador==jugadores[0])
      {
        turnoLocal=1;    
        marcaJugador=marcas[1];
        pizarraSt[fila][columna]=marcaJugador;  
      }
      else
      {
        turnoLocal=0;
        marcaJugador=marcas[0];
        pizarraSt[fila][columna]=marcaJugador;  
      }

      if(movimientos==0)
      {        
        empate=true;  
      }  
    } 
  } 
  buscarGanador();
  if (ganador && !empate)
  {
    respuesta={gana:request.body.jugador,estado:pizarraSt}
  }
  else if(empate)
  {          
    respuesta={'empate' : "empate", 'estado': pizarraSt}   
  }
  else if (!ganador && !empate)
  {
    respuesta={'turno' : jugadores[turnoLocal], 'estado': pizarraSt}   
  }      
  response.setHeader('Content-Type', 'application/json');      
  response.send(respuesta).status(200);
});

module.exports = router;
