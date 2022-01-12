class Check {
    // checkea si la secuencia es correcta:
    constructor() {
      this.reset();
    }
    
    reset() {
      // define valores iniciales
      this.letra = "" //letra evaluada
      this.cantidad = 0 // cuantas iguales
      this.ok = false // si hay iguales en el último checkeo.
      this.evaluado  = 0 // cuantas letras lleva evaluado
    }

    add(letter) {
      this.evaluado++;
      
      
      if(this.letra === "") {
        this.defineLetter(letter)
      } else if(this.letra == letter) {
        this.cantidad++;
        this.ok=true
      } else {
        this.defineLetter(letter)
      }
    }
    
    defineLetter(letter) {
      this.letra = letter
      this.cantidad = 1
      this.ok = false
    }
    
    isValid() {
      return this.cantidad>=4
    }

  }

  module.exports = Check