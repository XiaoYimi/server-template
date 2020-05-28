const UserModel = require('../models/index').getModel('user')

const user = {
  /* condition: { username, password } */
  async isExistsUser (query) {
    const res = await UserModel.findOne(query)
    return res
  },
  async createUser (document) {
    const res = await UserModel.create(document) 
    return res
  }
}

module.exports = user
