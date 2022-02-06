const APIError = require('./APIError')

class BadRequest extends APIError {
  constructor() {
    super('BadRequest', 400, 'BAD_REQUEST');
  }
}

module.exports = BadRequest