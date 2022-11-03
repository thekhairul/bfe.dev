// 1. implement curry()
function curry(fn) {
    return function curryied(...args) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length
        if (args.length >= fn.length) return fn.apply(this, args);
        return (...args2) => curryied(...args, ...args2);
    }
}

// 2. implement curry with placeholder