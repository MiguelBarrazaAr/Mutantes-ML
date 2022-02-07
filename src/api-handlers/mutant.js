const isMutant = require("../models/mutantes");
const dnaValidate  = require("../models/dnaValidate");
// respuestas:
const forbiddenError = require("../responses/forbiddenError");
const badRequestError = require("../responses/badRequestError");
const ok  = require("../responses/okey");

async function mutantValidate(dna, db) {
    if(!dnaValidate(dna)) {
        // datos incorrectos:
        throw new badRequestError();
    }

    if(isMutant(dna)) {
        db.putMutant(dna)
        .then(data => new ok())
        .catch(error => new ok())
    } else {
        db.putHuman(dna)
        .then(data => { throw new forbiddenError() })
        .catch(data => { throw new forbiddenError() })
    }
}

module.exports = mutantValidate