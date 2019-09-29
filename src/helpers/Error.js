export default class {
  constructor(err) {
    return {
      error: err.name,
      message: err.message
    }
  }
}
