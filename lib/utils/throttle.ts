// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function throttle(fn: Function, t: number) {
  let last = 0;
  return function (...args: unknown[]) {
    const now = Date.now();
    if (now - last > t) {
      last = now;
      fn(...args);
    }
  };
}
