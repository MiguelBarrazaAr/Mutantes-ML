const ok  = require("../responses/okey");

function resetDb(db) {
    db.deleteAll();
    return new ok();
}

module.exports = resetDb