// See https://adventofcode.com/2020/day/12

import { toInteger } from 'lodash';
import raw_input from './input/input_12.txt';

const example1 = `F10
N3
F7
R90
F11`;

const directions = {
    0: 'N',
    90: 'E',
    180: 'S',
    270: 'W',
};

const move = (d, value, pos) => {
    return {
        N: { ...pos, y: pos.y + value },
        S: { ...pos, y: pos.y - value },
        E: { ...pos, x: pos.x + value },
        W: { ...pos, x: pos.x - value },
    }[d];
};

const turn = (d, value, pos) => {
    return {
        R: { ...pos, heading: (pos.heading + value) % 360 },
        L: { ...pos, heading: Math.abs(pos.heading + 360 - value) % 360 },
    }[d];
};

const run = (steps) =>
    steps.reduce(
        (pos, { action, value }) => {
            if ('NESW'.includes(action)) {
                return move(action, value, pos);
            } else if (action === 'F') {
                return move(directions[pos.heading], value, pos);
            } else if ('RL'.includes(action)) {
                return turn(action, value, pos);
            }
        },
        { x: 0, y: 0, heading: 90 }
    );

const moveTowardWaypoint = (wp, value, pos) => ({
    ...pos,
    x: pos.x + value * wp.x,
    y: pos.y + value * wp.y,
});

const shiftWaypoint = (d, value, pos) => ({
    ...pos,
    waypoint: move(d, value, pos.waypoint),
});

const rotate = (d, value, waypoint) => {
    const action = d + value;
    if (action === 'R90' || action === 'L270') {
        // (10, 4) --> (4, -10) --> (-10, -4) --> (-4, 10)
        return { x: waypoint.y, y: -waypoint.x };
    } else if (action === 'R270' || action === 'L90') {
        // (10, 4) --> (-4, 10) --> (-10, -4) --> (4, -10)
        return { x: -waypoint.y, y: waypoint.x };
    } else if (action === 'R180' || action === 'L180') {
        // (10, 1) --> (-10, -1)
        // (1, -3) --> (-1, 3)
        return { x: -waypoint.x, y: -waypoint.y };
    }
    return null;
};

const rotateWaypoint = (d, value, pos) => ({
    ...pos,
    waypoint: rotate(d, value, pos.waypoint),
});

// not really a waypoint... it's a heading vector
const runWithWaypoints = (startWaypoint, steps) =>
    steps.reduce(
        (pos, { action, value }) => {
            if ('NESW'.includes(action)) {
                return shiftWaypoint(action, value, pos);
            } else if (action === 'F') {
                return moveTowardWaypoint(pos.waypoint, value, pos);
            } else if ('RL'.includes(action)) {
                const r = rotateWaypoint(action, value, pos);
                return r;
            }
        },
        { x: 0, y: 0, waypoint: startWaypoint }
    );

const manhattanDistance = (pos) => Math.abs(pos.x) + Math.abs(pos.y);

const toInstructions = (str) => ({ action: str[0], value: toInteger(str.slice(1)) });

describe('Day 12', () => {
    test('Example 1', () => {
        const steps = example1.split('\n').map(toInstructions);
        const pos = run(steps);
        expect(manhattanDistance(pos)).toBe(25);
    });

    test('Example 2', () => {
        const steps = example1.split('\n').map(toInstructions);
        const pos = runWithWaypoints({ x: 10, y: 1 }, steps);
        expect(manhattanDistance(pos)).toBe(286);
    });

    test('Part 1', () => {
        const steps = raw_input.split('\n').map(toInstructions);
        const pos = run(steps);
        expect(manhattanDistance(pos)).toBe(1424);
    });

    test('Part 2', () => {
        const steps = raw_input.split('\n').map(toInstructions);
        const pos = runWithWaypoints({ x: 10, y: 1 }, steps);
        expect(manhattanDistance(pos)).toBe(63447);
    });
});
