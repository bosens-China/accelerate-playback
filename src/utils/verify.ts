/* eslint-disable @typescript-eslint/no-explicit-any */
// 验证库

import { isObject, TypeString, getTypeString } from "./universal";

type VerifyType = TypeString | "any";

type VerifyRule<T extends Record<string, any>> = {
  [key in keyof T]: {
    type: VerifyType;
    message?: string;
    validator?: (value: T[key]) => boolean;
  };
};

export function verify<T extends Record<any, any>>(
  obj: T,
  rules: Array<VerifyRule<T>>
): boolean {
  if (!isObject(obj)) {
    throw new Error("Object to verify must be an object");
  }
  const types: VerifyType[] = [
    "undefined",
    "null",
    "object",
    "array",
    "string",
    "number",
    "boolean",
    "function",
    "regexp",
    "date",
    "error",
    "symbol",
    "bigint",
    "map",
    "set",
    "weakmap",
    "weakset",
    "arraybuffer",
    "dataview",
    "int8array",
    "uint8array",
    "uint8clampedarray",
    "int16array",
    "uint16array",
    "int32array",
    "uint32array",
    "float32array",
    "float64array",
    "bigint64array",
    "biguint64array",
    "sharedarraybuffer",
    "proxy",
    "promise",
    "generator",
    "generatorfunction",
    "asyncfunction",
    "asyncgenerator",
    "asyncgeneratorfunction",
    "weakref",
    "finalizationregistry",
    "any",
  ];

  for (let i = 0; i < rules.length; i++) {
    const key = Object.keys(rules[i])[0];
    const type = rules[i][key].type;
    const message = rules[i][key].message || `Failed to verify ${key}`;
    const value = obj[key];

    if (!types.includes(type)) {
      throw new Error(`Invalid type '${type}'`);
    }

    if (type === "any") {
      continue;
    }
    if (type === "object" && !isObject(value)) {
      throw new Error(message);
    }
    if (type !== getTypeString(value)) {
      throw new Error(message);
    }

    const validator = rules[i][key].validator;

    if (validator && typeof validator !== "function") {
      throw new Error("Custom validator must be a function");
    }

    if (validator && !validator(value)) {
      throw new Error(message);
    }
    return true;
  }
  return true;
}
