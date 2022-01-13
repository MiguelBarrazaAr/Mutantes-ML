const isMutant = require("../models/mutantes");
const dnaValidate  = require("../models/dnaValidate");
// respuestas:
const forbiddenError = require("./responses/forbiddenError");
const badRequestError = require("./responses/badRequestError");
const okey  = require("./responses/okey");

exports.handler = async (event) => {
    const data = JSON.parse(event.body);
    if(!dnaValidate(data.dna)) {
        // datos incorrectos:
        return badRequestError();
    }
    
    if(isMutant(data.dna)) {
        return okey();
    } else {
        return forbiddenError();
    }
};