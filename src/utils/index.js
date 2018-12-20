export function formatNumber (val) {
  const str = val.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (time) {
  const date = time
  const now = Date.now()
  const diff = (date - now) / 1000

  if (diff > 3600 * 24) {
    return parseInt(Math.ceil(diff / (60 * 60 * 24))) + '天后出发'
  } else if (diff > 3600) {
    return Math.ceil(diff / 3600) + '小时后出发'
  } else if (diff > 15 * 60) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟后出发'
  } else if (diff > 0 && diff < 15 * 60) {
    return '马上出发'
  } else {
    return '已出发'
  }
}

// ------------------------------------------------------------
const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export function formatDateTime (timestamp) {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = date.getDay()

  const hour = date.getHours()
  const minute = date.getMinutes()

  return formatNumber(month) + '月' + formatNumber(day) + '日（' + weeks[week] + '）' + formatNumber(hour) + ':' + formatNumber(minute)
}

export function formatDate (timestamp) {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = date.getDay()

  const hour = date.getHours()
  const minute = date.getMinutes()

  return formatNumber(month) + '月' + formatNumber(day) + '日'
}

export function parseDate (timeCn) {
  const now = new Date()
  const month = now.getMonth() + 1

  let yearCn = now.getFullYear()
  const monthDayCn = timeCn.split(' ')[0]
  const hourMinuteCn = timeCn.split(' ')[2]
  const monthCn = monthDayCn.substring(0, 2)
  const dayCn = monthDayCn.substring(3, 5)

  if (month > parseInt(monthCn)) {
    yearCn += 1
  }
  /*
  console.log(yearCn + '/' + monthCn + '/' + dayCn + ' ' + hourMinuteCn + ':00')
  */
  return new Date(`${yearCn}/${monthCn}/${dayCn} ${hourMinuteCn}:00`)
}

export function getDay (day) {
  let days = []
  let datestr
  let now = new Date()

  for (let i = 0; i < day; i++) {
    datestr = formatNumber(Number(now.getMonth()) + 1) + '月' + formatNumber(now.getDate()) + '日 ' + weeks[now.getDay()]
    days.push(datestr)
    now.setTime(now.getTime() + 1000 * 60 * 60 * 24)
  }
  return days
}

export function errorToast (title) {
  wx.showToast({
    title,
    icon: 'none',
    duration: 1300
  })
}
export function successToast (title) {
  wx.showToast({
    title,
    icon: 'success',
    duration: 1300
  })
}

export default {
  formatNumber,
  formatTime,
  getDay,
  errorToast
}
