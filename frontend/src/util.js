export function fixTimeDisplay(time) {
  return time > 9 ? time : "0" + time;
};

export function timeFormat(time) {
  return `${time.getDate()}-${
    time.getMonth() + 1
  }-${time.getFullYear()} ${fixTimeDisplay(
    time.getHours()
  )}:${fixTimeDisplay(time.getMinutes())}:${fixTimeDisplay(
    time.getSeconds()
  )}`;
}
