export default function throttle(fn: Function, t: number) {
  let last = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - last > t) {
      last = now;
      fn(...args);
    }
  };
}
