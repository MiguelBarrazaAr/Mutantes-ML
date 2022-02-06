var Analizer   = require("./analizer");

function isMutant(dna) {
    let analizer = new Analizer()
    return analizer.isMutant(dna)
}

module.exports = isMutant