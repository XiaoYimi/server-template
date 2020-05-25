const UserModel = require('../models/index').getModel('user')

const user = {
  async login (condition) {
    const res = await UserModel.findOne(condition)
    return res
  }
}

module.exports = user
