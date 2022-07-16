let timer: any;
export function requestDebounce(fn: any, debounce: number) {
  clearTimeout(timer);
  timer = setTimeout(function () {
    fn();
  }, debounce);
}
