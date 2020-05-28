// 验证模式
const pattern = {
  // tel: /^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$/,
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
  IDCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  IP: /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/,
  domain: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
  account: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, /* 5-16 位,字母数字下划线 */
  password: /^[a-zA-Z]\w{5,17}$/, /* 6-18 字母数字下划线 */
  passwordS: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,18}$/, /* 6-18 必须包含大小写字母和数字组合,无特殊符号 */
  passwordSS: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/, /* 6-18 必须包含大小写字母和数字组合,有特殊符号 */
  date: /^\d{4}-\d{1,2}-\d{1,2}/,
  year: /^\d{4}/,
  month: /^(0?[1-9]|1[0-2])$/,
  day: /^((0?[1-9])|((1|2)[0-9])|30|31)$/,
  xml: /^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$/,
  ZHCharacter: /[\u4e00-\u9fa5]/, /* 中文字符 */
  blankline: /\n\s*\r/, /* 空白行 */
  zipcode: /[1-9]\d{5}(?!\d)/, /* 邮编 */
}

// 验证方法
const checkRegex = (mode, data) => { return mode.test(data) }

module.exports = {
  pattern,
  checkRegex
}