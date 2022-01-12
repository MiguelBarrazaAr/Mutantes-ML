var Check  = require("./check");

class Analizer  {
    // dada una matriz verifica si es válida
    constructor() {
      this.check = new Check()
      this.cantidad =0 // cuantas secuencias correctas existen
    }

    isMutant(dna) {
    }

    checkRow(dna) {
        // verifica todas las filas
        console.log("inicia fila "+dna.length)
        for(let i=0; i<dna.length; i++) {
            console.log("cantidad: "+this.cantidad+", fila: "+i+", verificacion: "+this.isRow(dna, i))
            if(this.isValid()) return true
            if(this.isRow(dna, i)) this.cantidad++;
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

    isValid() {
      return this.cantidad>=2
    }

  }

  module.exports = Analizer
