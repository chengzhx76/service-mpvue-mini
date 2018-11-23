/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 邮箱校验
export function isEmail (email) {
  const re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return re.test(email)
}

// 手机号校验
export function isMobile (mobile) {
  const re8 = /^1(3[0-9]|4[457]|5[012356789]|66|7[135678]|8[0-9]|9[89])[0-9]{8}$/
  const re7 = /^170[01356789][0-9]{7}$/;
  return re8.test(mobile) || re7.test(mobile)
}

// 验证数字 - 只能是正整数
export function isInteger (val) {
  return /^[1-9]*[1-9][0-9]*$/.test(val)
}

// 验证数字 - 只能是正整数 和 0
export function isIntegerAndZero (val) {
  return val == '0' || /^[1-9]*[1-9][0-9]*$/.test(val)
}

// 校验只能包含字母和数字
export function isChaAndNum (param) {
  const re = /^[0-9a-zA-Z]+$/
  return re.test(param)
}
// 校验只能包含字母和数字
export function isMoney (amount) {
  const reg = /^([0-9]\d{0,4})([.]?|(\.\d{1,2})?)$/
  return reg.test(amount)
}

// 校验只能是现在之后的时间
export function isAfterNow (date) {
  return Date.parse(date) >= Date.now()
}

// 获取长度
export function len (param) {
  return param.replace(/[^\x00-\xff]/g, '**').length
}

// 校验汉字 是汉字返回true
export function isCn (param) {
  let reg = /^[\u4e00-\u9fa5]+$/
  return reg.test(param)
}

export function validateSpace (param) {
  if (!param) {
    return true
  }
  return param.split(' ').join('').length === 0
}
