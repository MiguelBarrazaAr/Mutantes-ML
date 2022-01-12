function isSquare(dna, len) {
    // verifica si el dna es una matriz cuadrada de 6x6
    console.log("filas: "+dna.length);
    if(dna.length != len) return false;
    for(let i = 0; i < len; i++) {
        if(dna[i].length != len) return false;
    }
    return true;
}

function letterIsCorrect(letra) {
    // validamos si la letra es correcta.
    // solo es correcta si es: A, C, G y T.
    return letra == "A" || letra == "C" || letra == "G" || letra == "T"
}

function LetterValidate(dna) {
    // validamos si tiene solo letras correctas
    for(let i = 0; i < dna.length; i++) {
        for(let j = 0; j < dna[i].length; j++) {
            if(!letterIsCorrect(dna[i][j])) return false
        }
    }
    return true;
}

function dnaValidate(dna) {
    return isSquare(dna, 6) && LetterValidate(dna)
}

module.exports = dnaValidate
