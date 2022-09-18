export function uniqueKey() {
  return String(new Date().getTime().valueOf() + Math.random().toString(16));
}