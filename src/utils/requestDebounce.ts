let timer: any;
export function requestDebounce(fn: any, debounce: number = 300) {
  clearTimeout(timer);
  timer = setTimeout(function () {
    fn();
  }, debounce);
}
