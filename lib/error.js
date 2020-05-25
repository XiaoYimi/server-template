/* Error Handler */

/* 用于自定义 code 值定义的相关错误 */
class CodeError extends Error {
  constructor (message = '', code = -1) {
    super(message)
    this.code = code
  }
}

/* 用于权限验证 */
class ForbiddenError extends CodeError {
  constructor (message = '拒绝访问') {
    super(message, 403)
  }
}

/* 用于参数的查询 */
class InvalidQueryError extends CodeError {
  constructor (message = '无效的参数') {
    super(message, 400)
  }
}

/* 用于页面未找到 */
class NotFindError extends CodeError {
  constructor (message = '未找到') {
    super(message, 404)
  }
}

module.exports = {
  CodeError,
  ForbiddenError,
  InvalidQueryError,
  NotFindError
}
