// See https://adventofcode.com/2020/day/1

import { toInteger } from 'lodash';
import raw_input from './input/input_01.txt';

const findPair = (total, list) => {
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            if (list[i] + list[j] === total) {
                return [list[i], list[j]];
            }
        }
    }
    return [];
};

const findTriplet = (total, list) => {
    for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
            for (let k = j + 1; k < list.length; k++) {
                if (list[i] + list[j] + list[k] === total) {
                    return [list[i], list[j], list[k]];
                }
            }
        }
    }
    return [];
};

const multiply = (list) => list.reduce((p, c) => p * c, 1);

describe('Day 1', () => {
    test('Example 1', () => {
        const input = [1721, 979, 366, 299, 675, 1456];
        const pair = findPair(2020, input);
        expect(multiply(pair)).toEqual(514579);
    });

    test('Example 2', () => {
        const input = [1721, 979, 366, 299, 675, 1456];
        const triplet = findTriplet(2020, input);
        expect(multiply(triplet)).toEqual(241861950);
    });

    test('Part 1', () => {
        const input = raw_input.split(/\n/).map(toInteger);
        const pair = findPair(2020, input);
        expect(multiply(pair)).toEqual(1015476);
    });

    test('Part 2', () => {
        const input = raw_input.split(/\n/).map(toInteger);
        const triplet = findTriplet(2020, input);
        expect(multiply(triplet)).toEqual(200878544);
    });
});
