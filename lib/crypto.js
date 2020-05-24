/* CryptoJS Helper */

const CryptoJS = require('crypto-js')

const showDataType = (data) => {
  const str = Object.prototype.toString.call(data)
  return (str.slice(str.indexOf(' ') + 1, str.indexOf(']'))).toLowerCase()
}

// 检测是否可以加密 (number, string, symbol, object)
const whetherEncrypt = (data) => {
  const list = ['number', 'string', 'symbol', 'object', 'array'] /* 可加密的数据类型 */ 
  const type = showDataType(data)
  const bool = list.some(item => item === type)
  return { state: bool, datatype: type, data: data }
}


/* 对称加密算法, 可逆算法; */
/* AES Encrypt (AES 加密) */
const AESEncrypt = (data, key) => {
  const { state, datatype } = whetherEncrypt(data)
  if (!state) { throw `该数据类型为 (${datatype}), 无法加密, 请转为 number, string, symbol, object 等数据类型` }
  
  /* If datatype is object or array, must be use JSON.stringify() transform to String */
  if (datatype === 'object' || datatype === 'array') { data = JSON.stringify(data) }

  return CryptoJS.AES.encrypt(data, key).toString()
}

/* AES Decrypt (AES 解密) */
const AESDecrypt = (byte, key) => {
  let res = CryptoJS.AES.decrypt(byte, key).toString()
  if ((res.startsWith('{') && res.endsWith('}')) || (res.startsWith('[') && res.endsWith(']'))) {
    return JSON.parse(res)
  }
  return res
}


/* 自定义 AES 加密, 对 Key, Iv 自定义 */
const AESCustomEncrypt = (data, key, iv) => {
  key = CryptoJS.enc.Hex.parse(key)
  iv = CryptoJS.enc.Hex.parse(iv)
  return CryptoJS.AES.encrypt(data, key, { iv: iv })
}

/* 自定义 AES 加密, 对 Key, Iv 自定义 */
const AESCustomDecrypt = (data, key, iv) => {
  key = CryptoJS.enc.Hex.parse(key)
  iv = CryptoJS.enc.Hex.parse(iv)
  return CryptoJS.AES.decrypt(data, key, { iv: iv })
}


/* 散列算法(哈希算法,不可逆算; 也不存在解密; 相同值会得到相同的结果) */
const MD5 = data => CryptoJS.MD5(data).toString()

/* SHA-1 */
const SHA1 = data => CryptoJS.SHA1(data).toString()
/* SHA-2 */
const SHA256 = data => CryptoJS.SHA256(data).toString()
const SHA512 = data => CryptoJS.SHA512(data).toString()

/* SHA-3 */
/* Argument bite is one of 224, 256, 384, or 512 bits */
const SHA3 = (data, bite) => CryptoJS.SHA3(data, { outputLength: bite }).toString()

/* 结合参数 Secret 进行验证, 用于身份验证 */
const HmacMD5 = (data, secret) => CryptoJS.HmacMD5(data, secret)
const HmacSHA256 = (data, secret) => CryptoJS.HmacSHA256(data, secret)
const HmacSHA512 = (data, secret) => CryptoJS.HmacSHA512(data, secret)


module.exports = {
  showDataType,  /* 显示待加密的数据类型(number, string, symbol, object, array) */
  whetherEncrypt, /* 检测是否可加密(true|false) */

  /* 对称算法, 可相互转换 */
  AESEncrypt,
  AESDecrypt,
  AESCustomEncrypt,
  AESCustomDecrypt,

  /* 散列算法(哈希算法, 不可逆) */
  MD5,
  SHA1,
  SHA256,
  SHA512,
  SHA3,
  HmacMD5,
  HmacSHA256,
  HmacSHA512
}
