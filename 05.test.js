// See https://adventofcode.com/2020/day/5

import { max, sortBy } from 'lodash';
import raw_input from './input/input_05.txt';

const locateSeat = (seat) => {
    const rowStr = seat.slice(0, 7);
    const colStr = seat.slice(7, 10);
    const row = parseInt(rowStr.replace(/F/g, 0).replace(/B/g, 1), 2);
    const col = parseInt(colStr.replace(/L/g, 0).replace(/R/g, 1), 2);
    return row * 8 + col;
};

const findMissingSeat = (seats) => {
    const sorted = sortBy(seats);
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i + 1] !== sorted[i] + 1) {
            return sorted[i] + 1;
        }
    }
    return null;
};

describe('Day 5', () => {
    test('Example 1', () => {
        expect(locateSeat('FBFBBFFRLR')).toBe(357);
        expect(locateSeat('BFFFBBFRRR')).toBe(567);
        expect(locateSeat('FFFBBBFRRR')).toBe(119);
        expect(locateSeat('BBFFBBFRLL')).toBe(820);
    });

    test('Part 1', () => {
        const input = raw_input.split('\n');
        const seats = input.map(locateSeat);
        expect(max(seats)).toBe(919);
    });

    test('Part 2', () => {
        const input = raw_input.split('\n');
        const seats = input.map(locateSeat);
        expect(findMissingSeat(seats)).toBe(642);
    });
});
