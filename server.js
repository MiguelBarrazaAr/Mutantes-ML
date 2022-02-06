var express = require('express') //llamamos a Express
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

// api errors:
const APIError = require('./src/responses/APIError');
const BadRequest = require('./src/responses/badRequestError');


const loadDb = require('./src/db');
const mutantValidate = require('./src/api-handlers/mutant');

const app = express()               
const router = express.Router();


// params:
const port = process.env.PORT || 3000  //  puerto de escucha
const stage = process.env.STAGE || "dev"  //  puerto de escucha

// base de datos:
const db = loadDb(stage);


// functions
function isNotUndefined(value) {
	return value != undefined;
}


function run(params, func, status=200) {
  return  (req, res) => {
    if (params.every(p => isNotUndefined(req.query[p]) || isNotUndefined(req.body[p]))) {
      const respuesta =  func(req, res);
	  res.status(status)
      res.json(respuesta);
    } else {
      throw new BadRequest;
    }
  };
}

function errorHandler(err, req, res, next) {
  console.error('Error '+ err.status);
  if (err instanceof APIError) {
    res.status(err.status);
    res.json(err);
  } else if (err.type === 'entity.parse.failed') {
    res.status(err.status);
    res.json(new BadRequest());
  } else {
    next(err);
  }
}


// router:

router.get('/ping', function(req, res) {
  res.send("pong")
})

// post  /mutant body=[dna]
router.post('/mutant', run(['dna'], (req, res) => {
  return mutantValidate(req.body.dna, db);
}));

// iniciamos nuestro servidor
app.use(bodyParser.json());
app.use('/'+stage, router)
app.use(errorHandler);
app.listen(port)
console.log('API escuchando en el puerto ' + port)