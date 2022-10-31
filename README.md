# Repositorio Trabajo Práctico 2 de la materia Testing de Sistemas IoT


En este trabajo práctico se implementa verificación y tésting de código. Es parte de la materia Testing de IoT dictada por Esteban Volentini (https://github.com/evolentini) y Carlos Pantelides (https://github.com/cpantel) y


Herramientas que se utilizan:

* <strong>CHAI</strong>: Libreria para el lenguaje Javascript que incorpora funciones para garantizar que las pruebas lleguen a resultados esperados.

        Url: https://www.chaijs.com/

* <strong>SINON</strong>: Libreria Javascript para generar funciones Spy, Stub o Mock. Este tipo de funciones emulan funciones externas inyectadas en archivo que se prueba.

        Url: https://sinonjs.org/      

* <strong>MOCHA</strong>: Framework que automatiza Testing para el lenguaje Javascript

        Url: https://mochajs.org/


En este trabajo se utiliza express, por lo que se debe instalar:

        >npm install express cookie-parser debug morgan
        >npm install -g express-generator

En este trabajo se utiliza express, por lo que se debe instalar:

Pruebas a realizar:

1-En un juego nuevo el tablero esta vacio y mueve el primer jugador \
2-completar una casilla, el tablero tiene una casilla ocupada y le toca al segundo jugador \
3-completar una casilla, el tablero tiene 2 casillas ocupada y le toca al priemr jugador\
4-no debe aceptar movimientos de jugadores que no le corresponden \
5-si un jugador quiere marcar una posicion tiene un error y sigue su tiempo de mover \
6-si 3 filas tienen la marca de un mismo jugador gano \
7-si 3 columnas tienen la marca de un mismo jugador gano\
8-si una diagonal tiene la marca de un mismo jugador gano\
9-si no hay mas espacios en el tablero es empate
