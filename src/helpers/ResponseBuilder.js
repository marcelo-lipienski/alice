class ResponseBuilder {
  constructor(data) {
    this.data = data
  }

  success() {
    return this.data
  }
}

export default ResponseBuilder
