var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Put empezar. */
router.put('/empezar', function(request, response) {
  response.send({
    turno : 'Juan',
    estado: [
            [' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' '],
    ]

  });
});

/* Put empezar. */
router.put('/movimiento', function(request, response) {
  response.send({
    turno : 'Pedro',
    estado: [
            ['0',' ',' '],
            [' ',' ',' '],
            [' ',' ',' '],
    ]

  });
});

module.exports = router;
