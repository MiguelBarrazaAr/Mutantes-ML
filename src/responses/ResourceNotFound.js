const APIError = require('./APIError')

class ResourceNotFound extends APIError {
  constructor() {
    super('ResourceNotFound', 404, 'RESOURCE_NOT_FOUND');
  }
}

module.exports = ResourceNotFound