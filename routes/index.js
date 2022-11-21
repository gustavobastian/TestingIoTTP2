var express = require('express');
var router = express.Router();

const marcas=['0','x'];

var pizarraSt;
var turnoLocal;
var jugadores;
let marcaJugador;
let movimientos;
let ganador=false;
let empate=false;

//busqueda de ganador
function buscarGanador()
{

    for (i=0;i<3;i++){
      if (checkColumna(i)){
        ganador=true;
        return;
      }  
      else if (checkFila(i)){
        ganador=true;
        return;
      }  
    }

    if (checkDiagonal()){
      ganador=true;
      return;
    }  

}

function checkDiagonal(){
  let output = false;
  if (pizarraSt[0][0]==pizarraSt[1][1]) 
    {
      if (pizarraSt[2][2]==pizarraSt[1][1]) 
      {
        if (pizarraSt[0][0]!=" "){
          return   output=true;
        }
      }  
    }  
  if (pizarraSt[0][2]==pizarraSt[1][1]) 
    {
      if (pizarraSt[2][0]==pizarraSt[1][1])
      {
        if (pizarraSt[1][1]!=" ")
          {
          return   output=true;
          }
      }    
    }    
  return output;
}

function checkColumna(col){
  output=false;
  if (pizarraSt[0][col]==pizarraSt[1][col]) 
  {
    if (pizarraSt[1][col]==pizarraSt[2][col])
      {
        if(pizarraSt[0][col]!=" ")
          {
            return output=true;
          }
      }
  }  
  return output=false;
}
function checkFila(fil){
  output=false;
  if (pizarraSt[fil][0]==pizarraSt[fil][1]) 
  {
    if (pizarraSt[fil][1]==pizarraSt[fil][2])
      {
        if(pizarraSt[fil][0]!=" ")
          {
            return output=true;
          }
      }
  }  
  return output=false;
}

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Express' });
});

/* Put empezar. */
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

/* Put movimiento. */
router.put('/movimiento', function(request, response) 
{
  let columna=request.body.columna;
  let fila=request.body.fila;
  let respuesta={}
  
  respuesta={}
  
  //gestiono turnos  
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
