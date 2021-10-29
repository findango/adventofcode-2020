// See https://adventofcode.com/2020/day/11

import { get, identity, isEqual } from 'lodash';
import raw_input from './input/input_11.txt';

const example1 = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const step1 = `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`;

const step2 = `#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##`;

const step1_2 = `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`;

const step2_2 = `#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#`;

const step6_2 = `#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#`;

const example2 = `.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`;

const example3 = `.............
.L.L.#.#.#.#.
.............`;

const example4 = `.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.`;

// prettier-ignore
const directions = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],           [1, 0],
    [-1, 1],  [0, 1],  [1, 1],
];

const empty = 'L';
const occupied = '#';

const equalTo = (a) => (b) => a === b;
const nonEmpty = (x) => !!x;
const toString = (seats) => seats.map((row) => row.join('')).join('\n');
const countOf = (value, seats) => seats.flatMap(identity).filter(equalTo(value)).length;

const findAdjacents = (seats, x, y) =>
    directions
        .map(([dx, dy]) => get(seats, [y + dy, x + dx])) //
        .filter(nonEmpty);

const findLineOfSight = (seats, x, y) =>
    directions
        .map(([dx, dy]) => {
            let n = 1;
            let s = '.';
            while (s === '.') {
                const sx = x + n * dx;
                const sy = y + n * dy;
                s = get(seats, [sy, sx]);
                n++;
            }
            return s;
        })
        .filter(nonEmpty);

const step = (search, seats, limitOccupied = 4) =>
    seats.map((r, y) =>
        r.map((s, x) => {
            const adjacents = search(seats, x, y);
            if (s === empty && !adjacents.includes(occupied)) {
                return occupied;
            } else if (
                s === occupied &&
                adjacents.filter(equalTo(occupied)).length >= limitOccupied
            ) {
                return empty;
            }
            return s;
        })
    );

const runUntilStable = (search, seats, limitOccupied = 4) => {
    let prev = [];
    let next = step(search, seats, limitOccupied);
    while (!isEqual(prev, next)) {
        prev = next.slice();
        next = step(search, next, limitOccupied);
    }
    return prev;
};

describe('Day 11', () => {
    test('step() should follow the rules', () => {
        const seats = example1.split('\n').map((r) => r.split(''));
        expect(toString(seats)).toEqual(example1);

        const next1 = step(findAdjacents, seats);
        expect(toString(next1)).toEqual(step1);

        const next2 = step(findAdjacents, next1);
        expect(toString(next2)).toEqual(step2);
    });

    test('findLineOfSight() should follow the rules', () => {
        const seats2 = example2.split('\n').map((r) => r.split(''));
        expect(findLineOfSight(seats2, 3, 4)).toEqual(['#', '#', '#', '#', '#', '#', '#', '#']);

        const seats3 = example3.split('\n').map((r) => r.split(''));
        expect(findLineOfSight(seats3, 1, 1)).toEqual(['L']);

        const seats4 = example4.split('\n').map((r) => r.split(''));
        expect(findLineOfSight(seats4, 3, 3)).toEqual([]);
    });

    test('step() should work with new line of sight rules', () => {
        const seats = example1.split('\n').map((r) => r.split(''));

        const next1 = step(findLineOfSight, seats, 5);
        expect(toString(next1)).toEqual(step1_2);

        const next2 = step(findLineOfSight, next1, 5);
        expect(toString(next2)).toEqual(step2_2);

        const next3 = step(findLineOfSight, next2, 5);
        const next4 = step(findLineOfSight, next3, 5);
        const next5 = step(findLineOfSight, next4, 5);
        const next6 = step(findLineOfSight, next5, 5);
        expect(toString(next6)).toEqual(step6_2);
    });

    test('Example 1', () => {
        const seats = example1.split('\n').map((r) => r.split(''));
        const a = runUntilStable(findAdjacents, seats);
        expect(countOf(occupied, a)).toBe(37);
    });

    test('Example 2', () => {
        const seats = example1.split('\n').map((r) => r.split(''));
        const a = runUntilStable(findLineOfSight, seats, 5);
        expect(countOf(occupied, a)).toBe(26);
    });

    test('Part 1', () => {
        const seats = raw_input.split('\n').map((r) => r.split(''));
        const a = runUntilStable(findAdjacents, seats);
        expect(countOf(occupied, a)).toBe(2194);
    });

    test('Part 2', () => {
        const seats = raw_input.split('\n').map((r) => r.split(''));
        const a = runUntilStable(findLineOfSight, seats, 5);
        expect(countOf(occupied, a)).toBe(1944);
    });
});
