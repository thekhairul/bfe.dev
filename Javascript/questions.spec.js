import { describe, expect, it } from 'vitest';
import { curry } from './questions';

describe('implement curry', () => {
    it('should return a function', () => {
        const curried = curry((a,b,c) => `${a}_${b}_${c}`);
        expect(curried).toBeTypeOf('function');
    });

    it('should return error if argument is not a function', () => {
        const curried = curry('hi');
        expect(curried).toBeInstanceOf(Error);
    });

    it('should return nested function if less arguments are passed', () => {
        const curried = curry((a,b,c) => `${a}_${b}_${c}`);
        expect(curried(1,2)).toBeTypeOf('function');
    });

    it('should execute original function if all arguments are passed', () => {
        const curried = curry((a,b,c) => a+b+c);
        expect(curried(1,2,3)).toEqual(6);
    });

    it('should execute original function after currying ends', () => {
        const curried = curry((a,b,c) => a+b+c);
        expect(curried(1,2)(3)).toEqual(6);
    })
});