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

// 3. implement Array.prototype.flat
// TODO: understand iterative solution from BFE.dev
export function flatRecurse(arr, depth = 1) {
    if (depth < 1) return [...arr];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) result.push(...flat(arr[i], depth - 1));
        else result.push(arr[i]);
    }
    return result;
}

export function flatIter(arr, depth = 1) {
    const stack = arr.map(item => [item, depth]);
    const result = [];

    while (stack.length) {
        const [item, itemDepth] = stack.pop();
        if (Array.isArray(item) && itemDepth > 0) {
            stack.push(...item.map(i => [i, itemDepth - 1]));
        } else {
            result.push(item);
        }
    }

    return result;
}

// 4. implement basic throttle()
export function throttle(func, wait) {
  let waiting = false;
  let waitingArgs;

  return (...args) => {
    // if called during waiting period, just store the args and return
    if (waiting) {
      waitingArgs = args;
      return;
    }
    // if called in normal period, immediately run the 'func'
    func(...args);
    // and then start waiting period
    waiting = true;
    const timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      waiting = false;
      // when waiting period ends in setTimeout, call the 'func' with previously stored args
      if (waitingArgs) {
        func(...waitingArgs);
        waitingArgs = null;
      }
    }, wait);
  }
}