// 获取时间
function dateFormat(date) {
  const dt = new Date(date);
  const y = dt.getFullYear();
  const m = padZone(dt.getMonth() + 1);
  const d = padZone(dt.getDate());

  const hh = padZone(dt.getHours());
  const mm = padZone(dt.getMinutes());
  const ss = padZone(dt.getSeconds());
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
}
// 补零函数
function padZone(n) {
  return n > 9 ? n : '0' + n;
}
// 获取时间 星期几
function dateWeek() {
  const date = new Date();
  const week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const y = date.getFullYear();
  const m = padZone(date.getMonth() + 1);
  const d = padZone(date.getDate());

  const hh = padZone(date.getHours());
  const mm = padZone(date.getMinutes());
  const ss = padZone(date.getSeconds());
  return `${y}-${m}-${d} ${hh}:${mm}:${ss} ${week[date.getDay()]}`;
}
export { dateFormat, dateWeek };
