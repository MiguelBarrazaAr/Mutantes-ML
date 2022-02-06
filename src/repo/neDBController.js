var Datastore = require('nedb');

class NeDBController {
    constructor() {
        this.db = null;
    }
    
    load() {
        // carga base de datos en memoria:
        this.db = new Datastore();
    }
    
    put(data) {
        // inserta en bd
        console.log("se inserta: ");
        console.log(data);
        this.db.insert(data, function(err, record) {
            if (err) {
                console.error(err);
                return;
            }
            return record;
        });
    }
    
    putMutant(dna) {
        this.put({dna:dna, mutant:true});
    }
    
    putHuman(dna) {
        this.put({dna:dna, mutant:false});
    }
    
}

module.exports = NeDBController