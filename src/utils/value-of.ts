/**
 * Gets an union type from the values
 * of an object
 * 
 */
export type ValueOf<T> = T[keyof T]
