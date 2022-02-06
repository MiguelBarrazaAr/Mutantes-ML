const APIError = require('./APIError')

class InternalServerError extends APIError {
  constructor() {
    super('InternalServerError', 500, 'INTERNAL_SERVER_ERROR');
  }
}

module.exports = InternalServerError