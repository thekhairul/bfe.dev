// 1. implement curry()
export function curry(fn) {
    if (typeof fn !== 'function') return new Error(`Expected function as a parameter. Found: ${typeof fn}`)
    return function curryied(...args) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length
        if (args.length >= fn.length) return fn.apply(this, args);
        return (...args2) => curryied(...args, ...args2);
    }
}

// 2. implement curry with placeholder
export function curryWithPlaceholder(fn) {
  if (typeof fn !== 'function') return new Error(`Expected function as a parameter. Found: ${typeof fn}`)
    return function curryied(...args) {
        if (args.length >= fn.length && !args.slice(0,fn.length).includes(curryWithPlaceholder.placeholder)) return fn.apply(this, args);
        return (...args2) => {
            const replacedArgs = args.includes(curryWithPlaceholder.placeholder) ? args.map(el => el === curryWithPlaceholder.placeholder && args2.length ? args2.shift() : el) : [...args, ...args2];
            return curryied(...replacedArgs);
        };
    }
}
curryWithPlaceholder.placeholder = Symbol()