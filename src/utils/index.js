function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDay (val) {
  const str = val.toString()
  return str[1] ? str : `0${str}`
}

export function getDay (day) {
  const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let days = []
  let datestr
  let now = new Date()

  for (let i = 0; i < day; i++) {
    datestr = formatDay(Number(now.getMonth()) + 1) + '月' + formatDay(now.getDate()) + '日 ' + weeks[now.getDay()]
    days.push(datestr)
    now.setTime(now.getTime() + 1000 * 60 * 60 * 24)
  }
  return days
}

export default {
  formatNumber,
  formatTime,
  formatDay,
  getDay
}
