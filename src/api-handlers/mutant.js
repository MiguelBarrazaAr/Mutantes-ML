const isMutant = require("../models/mutantes");
const dnaValidate  = require("../models/dnaValidate");
// respuestas:
const forbiddenError = require("../responses/forbiddenError");
const badRequestError = require("../responses/badRequestError");
const ok  = require("../responses/okey");

function mutantValidate(dna, db) {
    if(!dnaValidate(dna)) {
        // datos incorrectos:
        throw new badRequestError();
    }

    if(isMutant(dna)) {
        db.putMutant(dna);
        return new ok();
    } else {
        db.putHuman(dna);
        throw new forbiddenError();
    }
}

module.exports = mutantValidate