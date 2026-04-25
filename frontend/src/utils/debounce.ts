const timers = new Map<string, ReturnType<typeof setTimeout>>();

export function debounce<T>(
  key: string,
  fn: (arg: T) => void,
  delay = 300
) {
  return (arg: T) => {
    const existing = timers.get(key);
    if (existing) clearTimeout(existing);

    const timer = setTimeout(() => {
      fn(arg);
    }, delay);

    timers.set(key, timer);
  };
}