import { isObject } from './universal';

interface Options {
  // 是否全部替换
  replaceAll?: boolean;
}

export class Storage {
  constructor(public options?: Options) {}

  get<T = unknown>(key: string, defaultValue?: T): T {
    try {
      return JSON.parse(window.localStorage.getItem(key) || '') || defaultValue;
    } catch {
      return defaultValue as T;
    }
  }

  set<T = unknown>(key: string, value: T) {
    if (!isObject(value) || this.options?.replaceAll) {
      window.localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    const values = this.get(key) || {};
    window.localStorage.setItem(
      key,
      JSON.stringify({
        ...values,
        ...value,
      })
    );
  }
}

export const storage = new Storage();
