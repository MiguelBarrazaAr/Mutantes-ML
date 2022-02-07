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
        await db.putMutant(dna);
        return new ok();
    } else {
        await db.putHuman(dna);
        throw new forbiddenError();
    }
}

module.exports = mutantValidate