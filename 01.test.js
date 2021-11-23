// See https://adventofcode.com/2020/day/1

import { sum, toInteger } from 'lodash';
import { permutations } from 'itertools';
import raw_input from './input/input_01.txt';

const find = (count, total, list) => {
    const groups = permutations(list, count);
    for (const group of groups) {
        if (sum(group) === total) return group;
    }
    return [];
};

const multiply = (list) => list.reduce((p, c) => p * c, 1);

describe('Day 1', () => {
    test('Example 1', () => {
        const input = [1721, 979, 366, 299, 675, 1456];
        const pair = find(2, 2020, input);
        expect(multiply(pair)).toEqual(514579);
    });

    test('Example 2', () => {
        const input = [1721, 979, 366, 299, 675, 1456];
        const triplet = find(3, 2020, input);
        expect(multiply(triplet)).toEqual(241861950);
    });

    test('Part 1', () => {
        const input = raw_input.split(/\n/).map(toInteger);
        const pair = find(2, 2020, input);
        expect(multiply(pair)).toEqual(1015476);
    });

    test('Part 2', () => {
        const input = raw_input.split(/\n/).map(toInteger);
        const triplet = find(3, 2020, input);
        expect(multiply(triplet)).toEqual(200878544);
    });
});
