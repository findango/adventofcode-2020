// See https://adventofcode.com/2020/day/2
import { filter, toInteger } from 'lodash';
import raw_input from './input/input_02.txt';

const parse = (list) =>
    list.map((x) => {
        const [_, min, max, letter, pass] = x.split(/^(\d+)-(\d+) (.*): (.*)$/);
        return { min: toInteger(min), max: toInteger(max), letter, pass };
    });

const countLetter = (letter, str) => str.split('').filter((chr) => chr === letter).length;

const findValidEntries = (db) =>
    filter(db, (entry) => {
        const count = countLetter(entry.letter, entry.pass);
        return entry.min <= count && count <= entry.max;
    });

const findValidEntries2 = (db) =>
    filter(db, (entry) => {
        const a = entry.pass[entry.min - 1];
        const b = entry.pass[entry.max - 1];
        return (a === entry.letter || b === entry.letter) && a !== b;
    });

describe('Day 2', () => {
    test('Example 1', () => {
        const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];
        const db = parse(input);
        const valids = findValidEntries(db);
        expect(valids.length).toBe(2);
    });

    test('Example 2', () => {
        const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'];
        const db = parse(input);
        const valids = findValidEntries2(db);
        expect(valids.length).toBe(1);
    });

    test('Part 1', () => {
        const input = raw_input.split('\n');
        const db = parse(input);
        const valids = findValidEntries(db);
        expect(valids.length).toBe(536);
    });

    test('Part 2', () => {
        const input = raw_input.split('\n');
        const db = parse(input);
        const valids = findValidEntries2(db);
        expect(valids.length).toBe(558);
    });
});
