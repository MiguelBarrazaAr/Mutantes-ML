const APIError = require('./APIError')

class Forbidden extends APIError {
  constructor() {
    super('BadRequest', 403, 'Forbidden');
  }
}

module.exports = Forbidden