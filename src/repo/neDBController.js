var Datastore = require('nedb');

class NeDBController {
    constructor() {
        this.db = null;
    }
    
    load() {
        // carga base de datos en memoria:
        this.db = new Datastore();
        //this.db.ensureIndex({fieldName: 'dna', unique: true});
    }
    
    async put(data) {
        // inserta en bd
        let db = this.db;
        return new Promise(function (resolve, rejection) {
            db.insert(data, function(err, record) {
                if (err) {
                    rejection(err);
                } else {
                    resolve(record);
                }
            });
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
                    rejection(err);
                } else {
                    resolve(record);
                }
            });
        });
    }
    
    async putMutant(dna) {
        return this.count({dna:dna}).then(res => {
            if(res==0) this.put({dna:dna, mutant:true});
        });
    }
    
    async putHuman(dna) {
        return this.count({dna:dna}).then(res => {
            if(res==0) this.put({dna:dna, mutant:false});
        });
    }
    
    async countMutant() {
        return  await this.count({mutant: true});
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