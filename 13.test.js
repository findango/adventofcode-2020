// See https://adventofcode.com/2020/day/13
// Maybe has a solution via the Chinese Remainder Theorem? (which I do not know)

import { first, isEmpty, isInteger, toInteger } from 'lodash';
import { replace } from 'lodash/fp';

const nextBus = (earliest, busses) => {
    let tick = earliest;
    // let's avoid infinite loop mistakes
    while (tick < earliest + 1000) {
        const departing = busses.filter((bus) => isInteger(tick / bus));
        if (!isEmpty(departing)) {
            return { id: first(departing), departs: tick };
        }
        tick++;
    }
};

const firstBusSequence = (busses) => {
    let stride = 1;
    let tick = 0;
    for (let i = 0; i < busses.length; i++) {
        const b = busses[i];
        while (!isInteger((tick + i) / b)) {
            tick += stride;
        }
        stride = stride * b;
    }
    return tick;
};

const parseBusses = (str) => str.split(',').map(replace('x', '1')).map(toInteger);
const exclude = (v) => (x) => x !== v;

describe('Day 13', () => {
    test('Example 1', () => {
        const earliest = 939;
        const busses = parseBusses('7,13,x,x,59,x,31,19').filter(exclude(1));
        const bus = nextBus(earliest, busses);
        const wait = bus.departs - earliest;
        expect(wait * bus.id).toBe(295);
    });

    test('Part 1', () => {
        const earliest = 1009310;
        const busses = parseBusses(
            '19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,599,x,29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,x,23,x,x,x,x,x,x,x,761,x,x,x,x,x,x,x,x,x,41,x,x,13'
        ).filter(exclude(1));
        const bus = nextBus(earliest, busses);
        const wait = bus.departs - earliest;
        expect(wait * bus.id).toBe(2995);
    });

    test('Example 2', () => {
        const busses = parseBusses('7,13,x,x,59,x,31,19');
        expect(firstBusSequence(busses)).toBe(1068781);

        const busses2 = parseBusses('17,x,13,19');
        expect(firstBusSequence(busses2)).toBe(3417);

        const busses3 = parseBusses('67,7,59,61');
        expect(firstBusSequence(busses3)).toBe(754018);

        const busses4 = parseBusses('67,x,7,59,61');
        expect(firstBusSequence(busses4)).toBe(779210);

        const busses5 = parseBusses('67,7,x,59,61');
        expect(firstBusSequence(busses5)).toBe(1261476);

        const busses6 = parseBusses('1789,37,47,1889');
        expect(firstBusSequence(busses6)).toBe(1202161486);
    });

    test('Part 2', () => {
        const busses = parseBusses(
            '19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,599,x,29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,x,23,x,x,x,x,x,x,x,761,x,x,x,x,x,x,x,x,x,41,x,x,13'
        );
        expect(firstBusSequence(busses)).toBe(1012171816131114);
    });
});
