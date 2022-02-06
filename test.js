var assert    = require("chai").assert;
var isMutant = require("./src/models/mutantes");
var Check  = require("./src/models/check");
var Analizer = require("./src/models/analizer");
var dnaValidate = require("./src/models/dnaValidate");

describe('analizador de secuencias', () => {
  it('agrega una letra al analizador', () => {
    let check = new Check();
    let letra="a"
    check.add(letra)
    assert.isFalse(check.ok);
    assert.equal(check.letra, letra)
    assert.equal(check.cantidad, 1)
  });

  it('al agregar dos letras iguales al analizador nos devuelve la información', () => {
    let check = new Check();
    let letra="a"
    check.add(letra)
    check.add(letra)

    assert.isTrue(check.ok);
    assert.equal(check.letra, letra)
    assert.equal(check.cantidad, 2)
  });

  it('al agregar cuatro letras iguales al analizador nos devuelve la información', () => {
    let check = new Check();
    let letra="a"
    check.add(letra)
    check.add(letra)
    check.add(letra)
    check.add(letra)

    assert.isTrue(check.ok);
    assert.equal(check.letra, letra)
    assert.equal(check.cantidad, 4)
  });

  it('al romper la secuencia solo queda con la ultima letra', () => {
    let check = new Check();
    let letra="a"
    let letra2 = "g"
    check.add(letra)
    check.add(letra)
    check.add(letra)
    check.add(letra2)

    assert.isFalse(check.ok);
    assert.equal(check.letra, letra2)
    assert.equal(check.cantidad, 1)
  });

  it('al romper la secuencia puede seguir recordando letras iguales', () => {
    let check = new Check();
    let letra="a"
    let letra2 = "g"
    check.add(letra)
    check.add(letra)
    check.add(letra2)
    check.add(letra2)

    assert.isTrue(check.ok);
    assert.equal(check.letra, letra2)
    assert.equal(check.cantidad, 2)
  });

  it('solo es válido cuando hay cuatro letras iguales', () => {
    let check = new Check();
    let letra = "A"
    for(let i=0; i<4; i++) {
      check.add(letra)
      if(check.cantidad == 4) {
        assert.isTrue(check.isValid());
      } else {
        assert.isFalse(check.isValid());
      }
    }

    assert.equal(check.letra, letra)
  });

  it('al reiniciar se setean los valores iniciales', () => {
    let check = new Check();
    check.add("A")
    check.add("A")
    check.reset()

    assert.isFalse(check.ok);
    assert.equal(check.letra, "")
    assert.equal(check.cantidad, 0)
  });

});

describe('analizador de matrices mutantes', () => {
    it('valida filas con secuencias correctas', () => {
        let dna = ["AAAATC", "TAAAAC", "TCAAAA", "AATCAA", "AAATCA", "ATCAAA"]
        let analizer = new Analizer()

        // analizamos filas correctas
        assert.isTrue(analizer.isRow(dna, 0));
        assert.isTrue(analizer.isRow(dna, 1));
        assert.isTrue(analizer.isRow(dna, 2));
        assert.isFalse(analizer.isRow(dna, 3));
        assert.isFalse(analizer.isRow(dna, 4));
        assert.isFalse(analizer.isRow(dna, 5));
    });

    it('valida columnas con secuencias correctas', () => {
        let dna = ["GCCGCC", "GGCGGC","GGGTTT","GGGTCG","TGGGTC","CTGGGT"]
        let analizer = new Analizer()

        // analizamos columnas correctas
        assert.isTrue(analizer.isCol(dna, 0));
        assert.isTrue(analizer.isCol(dna, 1));
        assert.isTrue(analizer.isCol(dna, 2));
        assert.isFalse(analizer.isCol(dna, 3));
        assert.isFalse(analizer.isCol(dna, 4));
        assert.isFalse(analizer.isCol(dna, 5));
    });

    it('valida si existe secuencia en las filas con un dna mutante', () => {
        let dna = ["AAAATC", "TAAAAC", "TCAAAA", "AATCAA", "AAATCA", "ATCAAA"]
        let analizer = new Analizer()
        assert.isTrue(analizer.checkRow(dna));
    });

    it('valida si existe secuencia en las filas con un dna que no tiene filas validas', () => {
        let dna = ["GCCGCC", "GGCGGC","GGGTTT","GGGTCG","TGGGTC","CTGGGT"]
        let analizer = new Analizer()
        assert.isFalse(analizer.checkRow(dna));
    });

    it('valida si existe secuencia en las columnas con un dna mutante', () => {
        let dna = ["GCCGCC", "GGCGGC","GGGTTT","GGGTCG","TGGGTC","CTGGGT"]
        let analizer = new Analizer()
        assert.isTrue(analizer.checkCol(dna));
    });

    it('valida si existe secuencia en las columnas con un dna que no tiene columnas válidas', () => {
        let dna = ["AAAATC", "TAAAAC", "TCAAAA", "AATCAA", "AAATCA", "ATCAAA"]
        let analizer = new Analizer()
        assert.isFalse(analizer.checkCol(dna));
    });

    it('valida un dna mutante si la secuencia esta por fila o columnas', () => {
        let dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        let analizer = new Analizer()
        assert.isTrue(analizer.isMutant(dna));
    });

    it('luego de analizar un dna se puede reiniciar los valores a inicio', () => {
        let dna = ["AAAATC", "TAAAAC", "TCAAAA", "AATCAA", "AAATCA", "ATCAAA"]
        let analizer = new Analizer()
        assert.isFalse(analizer.isValid());
        assert.equal(analizer.cantidad, 0);

        analizer.isMutant(dna);
        assert.isTrue(analizer.isValid());
        assert.equal(analizer.cantidad, 2);
        analizer.reset()
        assert.isFalse(analizer.isValid());
        assert.equal(analizer.cantidad, 0);
    });


    it('valida una diagonal de un dna dado un punto inicial', () => {
        let dna = ["GTCTCA", "CGTGAC", "ATGTAA", "TAAGTA","TGACTA", "ATCAAA"];
        let analizer = new Analizer()
        assert.isTrue(analizer.isOblique(dna, 0, 0));
        assert.isTrue(analizer.isOblique(dna, 0, 1));
        assert.isFalse(analizer.isOblique(dna, 0, 2));
        assert.isFalse(analizer.isOblique(dna, 0, 5));
        assert.isTrue(analizer.isOblique(dna, 3, 0));
        assert.isFalse(analizer.isOblique(dna, 4, 0));
    });

    it('valida todas las diagonales de un dna y responde si es mutante', () => {
        let dna = ["GTCTCA", "CGTGAC", "ATGTAA", "TAAGTA","TGACTA", "ATCAAA"];
        let analizer = new Analizer()
        assert.isTrue(analizer.checkOblique(dna));
    });

    it('valida un dna con secuencia valida en forma orizontal y diagonal y responde si es mutante', () => {
        let dna = ["ATGCTA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        let analizer = new Analizer()
        assert.isTrue(analizer.isMutant(dna));
    });

});

describe('validador de dna correctos', () => {
  it('valida si es un dna correcto si la matriz es cuadrada de 6 x 6', () => {
    let dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
    assert.isTrue(dnaValidate(dna));
    // no es valido porque tiene 5 filas
    let dna2 = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA"];
    assert.isFalse(dnaValidate(dna2));
    // no es valido porque la ultima fila tiene 5 columnas
    let dna3 = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACT"];
    assert.isFalse(dnaValidate(dna3));
  });

  it('valida si es un dna correcto si tiene solo letras correctas', () => {
    let dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
    assert.isTrue(dnaValidate(dna));
    // tiene en la ultima fila una letra "M" que es incorrecto.
    let dna2 = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACMG"];
    assert.isFalse(dnaValidate(dna2));
  });

});

describe('chequeador de mutantes', () => {
  it('valida un dna correcto', () => {
    const dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
    assert.isTrue(isMutant(dna));
  });
});
