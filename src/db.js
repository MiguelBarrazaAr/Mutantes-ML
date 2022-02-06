const neDBController  = require('./repo/neDBController')

function loadDb(type) {
    if(type == "dev") {
        const db = new neDBController()
        db.load();
        return db;
    } else {
        throw new Error("database  not exists");
    }
}

module.exports = loadDb