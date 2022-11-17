// 1. implement Partial
export type myPartial<T> = { [K in keyof T]?: T[K] }

// 2. implement Required
export type myRequired<T> = { [K in keyof T]-?: T[K] }
