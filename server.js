var express = require('express') //llamamos a Express
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

// api errors:
const APIError = require('./src/responses/APIError');
const BadRequest = require('./src/responses/badRequestError');
const ResourceNotFound = require('./src/responses/ResourceNotFound');


const loadDb = require('./src/db');
const mutantValidate = require('./src/api-handlers/mutant');
const stats  = require('./src/api-handlers/stats');
const resetDb   = require('./src/api-handlers/resetDb');

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

function runAsync(params, func, status=200) {
  return  async (req, res, next) => {
    if (params.every(p => isNotUndefined(req.query[p]) || isNotUndefined(req.body[p]))) {
      try{
        const respuesta = await func(req);
        res.status(status)
        res.json(respuesta);
      }catch(e){
        next(e);
      }
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

function throwException(res, e) {
  res.status(e.status).send(e);
}


// router:

router.get('/ping', function(req, res) {
  res.send("pong")
})

// post  /mutant body=[dna]
router.post('/mutant', runAsync(['dna'], async (req, res) => {
  return mutantValidate(req.body.dna, db);
}));

// delete  /reset body=[]
router.delete('/reset', run([], (req, res) => {
  return resetDb(db);
}));

router.get('/stats',    runAsync([], async (req, res) => {
  return await stats(db);
}));

router.use('/', (req, res) => {
  throwException(res, new ResourceNotFound);
});

// iniciamos nuestro servidor
app.use(bodyParser.json());
app.use('/'+stage, router)
app.use(errorHandler);
app.listen(port)
console.log('API escuchando en el puerto ' + port)