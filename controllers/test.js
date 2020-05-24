/* Controller name, should be lowercase */
/* { code: '<code>', msg: '<msg>', data: '<data>' } */

const test = {}

/* Standard writing */
test.testpublic = async (ctx, next) => {
  ctx.body = {
    code: 200,
    msg: 'OK',
    data: {
      req: 1,
      res: 2
    },
    list: ['list'] // invalid, no return this field.
  }
  next() // must use
}

/* Nonstandard writing */
test.testprivate = async ctx => {
  ctx.result = {
    code: 200,
    msg: 'OK',
    data: 'Private API OK'
  }
}

module.exports = test
