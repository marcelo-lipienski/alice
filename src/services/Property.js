import Error from '../helpers/Error.js'
import Property from '../models/Property.js'

class PropertyService {
  async all() {
    try {
      return await Property.find({ })
    } catch(err) {
      return new Error(err)
    }
  }

  async save(property) {
    try {

    } catch (err) {
      return new Error(err)
    }
  }
}

export default new PropertyService()
