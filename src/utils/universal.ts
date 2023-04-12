export const isObject = (obj: unknown): obj is object => {
  return !!obj && typeof obj === "object";
};

export type TypeString =
  | "undefined"
  | "null"
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | "function"
  | "regexp"
  | "date"
  | "error"
  | "symbol"
  | "bigint"
  | "map"
  | "set"
  | "weakmap"
  | "weakset"
  | "arraybuffer"
  | "dataview"
  | "int8array"
  | "uint8array"
  | "uint8clampedarray"
  | "int16array"
  | "uint16array"
  | "int32array"
  | "uint32array"
  | "float32array"
  | "float64array"
  | "bigint64array"
  | "biguint64array"
  | "sharedarraybuffer"
  | "proxy"
  | "promise"
  | "generator"
  | "generatorfunction"
  | "asyncfunction"
  | "asyncgenerator"
  | "asyncgeneratorfunction"
  | "weakref"
  | "finalizationregistry";

export function getTypeString(value: unknown) {
  return Object.prototype.toString
    .call(value)
    .slice(8, -1)
    .toLowerCase() as TypeString;
}

// 递归展开
export function flatten<T>(array: T[][]): T[] {
  const result: T[] = [];

  array.forEach((item) => {
    if (Array.isArray(item)) {
      result.push(...(flatten(item as any) as any));
    } else {
      result.push(item);
    }
  });

  return result;
}

// 防抖
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | NodeJS.Timeout;

  return function debounced(this: any, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
