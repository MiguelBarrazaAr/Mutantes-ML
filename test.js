var assert    = require("chai").assert;
var isMutant = require("./models/mutantes");
var Check  = require("./models/check");
var Analizer = require("./models/analizer");

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

});

describe('chequeador de mutantes', () => {
  it('valida un dna correcto', () => {
    const dna = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
    assert.isTrue(isMutant(dna));
  });
});
