/* Model User */

module.exports = {
  name: 'user',
  schema: {
    username: String,
    password: String
  },
  indexs: [{username: 1}]
}
