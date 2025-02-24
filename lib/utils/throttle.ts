export default function throttle<T extends (...args: any[]) => unknown>(
  fn: T,
  t: number
) {
  let last = 0;
  return function (...args: unknown[]) {
    const now = Date.now();
    if (now - last > t) {
      last = now;
      fn(...args);
    }
  };
}
