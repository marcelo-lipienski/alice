export default new class ResponseBuilder {
  construct() {}

  success(status, data) {
    return this._response(status, data)
  }

  error(status, data) {
    return this._response(status, data)
  }

  _response(status, data) {
    return { status: status, data }
  }
}
