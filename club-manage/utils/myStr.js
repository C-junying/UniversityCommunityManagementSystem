// 生成自己的uuid
// 格式：年月日小时分钟秒+随机四位数 = 共19位

// 获取时间
function myTime(dt) {
  const y = dt.getFullYear()
  const m = padZone(dt.getMonth() + 1)
  const d = padZone(dt.getDate())

  const hh = padZone(dt.getHours())
  const mm = padZone(dt.getMinutes())
  const ss = padZone(dt.getSeconds())
  return `${y}${m}${d}${hh}${mm}${ss}`
}
// 获取当前时间 字符串
function getNowTimeStr() {
  const dt = new Date()
  return myTime(dt)
}
// 获取当前时间
function getNowTime() {
  const dt = new Date()
  return dt
}
// 转换时间格式
function dataFormat(dataStr) {
  const dt = new Date(dataStr)
  return myTime(dt)
}
// 补零函数
function padZone(n) {
  return n > 9 ? n : '0' + n
}
// 生成随机数4位
function getRandom() {
  let str = String(Math.floor(Math.random() * 10000))
  str = str.padStart(4, '0')
  return str
}
// 生成单个18位数
function uuid() {
  return `${getNowTimeStr()}${getRandom()}`
}
// 生成多个18位数
function moreUUID(n) {
  let setArr = new Set()
  while (setArr.size < n) {
    setArr.add(uuid())
  }
  return [...setArr]
}
module.exports = { uuid, getNowTime, dataFormat, moreUUID }
