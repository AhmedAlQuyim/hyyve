export const unstable_cache = <T extends (...args: any[]) => any>(
  fn: T,
  _keys?: string[],
  _opts?: object,
): T => fn;
