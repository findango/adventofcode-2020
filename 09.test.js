// See https://adventofcode.com/2020/day/9

import { min, max, sum, toInteger } from 'lodash';
import raw_input from './input/input_09.txt';

const exampleInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

const hasSummingPair = (target, nums) => {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return true;
            }
        }
    }
    return false;
};

const findMismatch = (windowSize, nums) => {
    const window = nums.slice(0, windowSize);
    for (let i = windowSize; i < nums.length; i++) {
        if (!hasSummingPair(nums[i], window)) {
            return nums[i];
        }
        window.shift();
        window.push(nums[i]);
    }
    return null;
};

const findSummingList = (target, nums) => {
    for (let start = 0; start < nums.length; start++) {
        for (let end = start + 1; end < nums.length; end++) {
            const list = nums.slice(start, end);
            if (sum(list) === target) {
                return list;
            }
        }
    }
    return null;
};

describe('Day 9', () => {
    test('Example 1', () => {
        const input = exampleInput.split('\n').map(toInteger);
        const result = findMismatch(5, input);
        expect(result).toBe(127);
    });

    test('Example 2', () => {
        const input = exampleInput.split('\n').map(toInteger);
        const mismatch = findMismatch(5, input);
        const list = findSummingList(mismatch, input);
        const result = min(list) + max(list);
        expect(result).toBe(62);
    });

    test('Part 1', () => {
        const input = raw_input.split('\n').map(toInteger);
        const result = findMismatch(25, input);
        expect(result).toBe(57195069);
    });

    test('Part 2', () => {
        const input = raw_input.split('\n').map(toInteger);
        const mismatch = findMismatch(25, input);
        const list = findSummingList(mismatch, input);
        const result = min(list) + max(list);
        expect(result).toBe(7409241);
    });
});
