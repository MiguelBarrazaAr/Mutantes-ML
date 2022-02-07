var Datastore = require('nedb');

class NeDBController {
    constructor() {
        this.db = null;
    }
    
    load() {
        // carga base de datos en memoria:
        this.db = new Datastore();
        this.db.ensureIndex({fieldName: 'dna', unique: true});
    }
    
    put(data) {
        // inserta en bd
        this.db.insert(data, function(err, record) {
            if (err) {
                return;
            } else {
                return record;
            }
        });
    }
    
    remove(filter, params) {
        // borra de  bd
        this.db.remove(filter, params, function(err, numRemoved) {
            if (err) {
                return;
            }
            return numRemoved;
        });
    }
    
    async count(filter) {
        let db = this.db;
        return new Promise(function (resolve, rejection) {
            db.count(filter, function(err, record) {
                if (err) {
                    rejection(Error("no se pudo conectar"));
                } else {
                    resolve(record);
                }
            });
        });
    }
    
    putMutant(dna) {
        this.put({dna:dna, mutant:true});
    }
    
    putHuman(dna) {
        this.put({dna:dna, mutant:false});
    }
    
    async countMutant() {
        let cant=  await this.count({});
        return cant;
    }
    
    async countHuman() {
        return  await this.count({mutant: false});
    }
    
    deleteAll() {
        // advertencia: metodo peligroso.
        // borra toda la base de datos.
        this.remove({}, { multi: true });
    }
}

module.exports = NeDBController