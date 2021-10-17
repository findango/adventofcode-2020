// See https://adventofcode.com/2020/day/6

import { every, filter, flatMap, map, reduce, uniq } from 'lodash';
import { includes, split } from 'lodash/fp';
import raw_input from './input/input_06.txt';

const testInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

const uniqueAnswersPerGroup = (groups) =>
    map(groups, (people) => {
        const answers = flatMap(people, split(''));
        return uniq(answers);
    });

const commonAnswersPerGroup = (groups) =>
    map(groups, (people) => {
        const answers = flatMap(people, split(''));
        const common = filter(uniq(answers), (ans) => every(people, includes(ans)));
        return common;
    });

const count = (list) => list.length;
const sum = (a, b) => a + b;
const sumCounts = (list) => reduce(map(list, count), sum);

describe('Day 6', () => {
    test('Example 1', () => {
        const groups = testInput.split('\n\n').map(split('\n'));
        const answers = uniqueAnswersPerGroup(groups);
        expect(sumCounts(answers)).toBe(11);
    });

    test('Example 2', () => {
        const groups = testInput.split('\n\n').map(split('\n'));
        const answers = commonAnswersPerGroup(groups);
        expect(sumCounts(answers)).toBe(6);
    });

    test('Part 1', () => {
        const groups = raw_input.split('\n\n').map(split('\n'));
        const answers = uniqueAnswersPerGroup(groups);
        expect(sumCounts(answers)).toBe(6590);
    });

    test('Part 2', () => {
        const groups = raw_input.split('\n\n').map(split('\n'));
        const answers = commonAnswersPerGroup(groups);
        expect(sumCounts(answers)).toBe(3288);
    });
});
