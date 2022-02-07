var Check  = require("./check");

class Analizer  {
    // dada una matriz verifica si es válida
    constructor() {
      this.check = new Check()
      this.cantidad =0 // cuantas secuencias correctas existen
    }

    reset() {
        this.cantidad = 0
    }

    isMutant(dna) {
        // validamos si es mutante
        this.checkRow(dna)
        this.checkCol(dna)
        this.checkOblique(dna)
        return this.isValid()
    }

    checkRow(dna) {
        // verifica todas las filas
        for(let i=0; i<dna.length; i++) {
            if(this.isValid()) return true
            if(this.isRow(dna, i)) this.cantidad++;
        }
        return this.isValid()
    }

    checkCol(dna) {
        // verifica todas las columnas
        for(let i=0; i<dna[0].length; i++) {
            if(this.isValid()) return true
            if(this.isCol(dna, i)) this.cantidad++;
        }
        return this.isValid()
    }


    checkOblique(dna) {
        // verifica todas las diagonales
        let len = dna.length/2
        for(let i=0; i<len; i++) {
            for(let j=0; j<len; j++) {
                if(this.isValid()) return true
                if(this.isOblique(dna, i, j)) this.cantidad++;
            }
        }
        return this.isValid()
    }

    isRow(dna, x) {
      // verifica la fila x si es valida
      let lenght = dna[x].length
      for(let i = 0; i < lenght; i++) {
        this.check.add(dna[x][i])
        if(this.check.isValid()) {
          this.check.reset()
          return true
        }
      }
      this.check.reset()
      return this.check.isValid()
    }

    isCol(dna, x) {
      // verifica la columna x si es valida
      let lenght = dna.length
      for(let i = 0; i < lenght; i++) {
        this.check.add(dna[i][x])
        if(this.check.isValid()) {
          this.check.reset()
          return true
        }
      }
      this.check.reset()
      return this.check.isValid()
    }

    isOblique(dna, x, y) {
        // chequea diagonales
        if(x< dna.lenght/2) {
            // checkea diagonales inferiores:
            return this.isObliqueDown(dna, x, y)
        } else {
            // checkea diagonal superior:
            return this.isObliqueUp(dna, x, y)
        }
    }

    isObliqueDown(dna, x, y) {
        // verifica diagonal inferior:
        // valida que no se vaya de rango
        if(x+3 > 5 || y+3 > 5) return false
        // analizamos:
        for(let i=0; i<4; i++) {
            this.check.add(dna[x+i][y+i])
            if(i>0 && !this.check.ok) return false
        }
        return true
    }

    isObliqueUp(dna, x, y) {
        // verifica diagonal superior:
        // valida que no se vaya de rango
        if(x-3 < 0 || y+3 > 5) return false
        // analizamos:
        for(let i=0; i<4; i++) {
            this.check.add(dna[x-i][y+i])
            if(i>0 && !this.check.ok) return false
        }
        return true
    }

    isValid() {
      return this.cantidad>=2
    }

  }

  module.exports = Analizer
