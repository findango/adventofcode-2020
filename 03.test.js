// See https://adventofcode.com/2020/day/3

import raw_input from './input/input_03.txt';

const count = (map, slope) => {
    let total = 0;
    let [x, y] = [0, 0];

    while (y < map.length) {
        const row = map[y].split('');
        if (row[x % row.length] === '#') {
            total += 1;
        }
        x += slope[0];
        y += slope[1];
    }

    return total;
};

const product = (list) => list.reduce((p, c) => p * c, 1);

describe('Day 3', () => {
    const exampleMap = [
        '..##.......',
        '#...#...#..',
        '.#....#..#.',
        '..#.#...#.#',
        '.#...##..#.',
        '..#.##.....',
        '.#.#.#....#',
        '.#........#',
        '#.##...#...',
        '#...##....#',
        '.#..#...#.#',
    ];

    test('Example 1', () => {
        const trees = count(exampleMap, [3, 1]);
        expect(trees).toBe(7);
    });

    test('Example 2', () => {
        const trees = [
            count(exampleMap, [1, 1]),
            count(exampleMap, [3, 1]),
            count(exampleMap, [5, 1]),
            count(exampleMap, [7, 1]),
            count(exampleMap, [1, 2]),
        ];
        expect(product(trees)).toBe(336);
    });

    test('Part 1', () => {
        const map = raw_input.split('\n');
        const trees = count(map, [3, 1]);
        expect(trees).toBe(274);
    });

    test('Part 2', () => {
        const map = raw_input.split('\n');
        const trees = [
            count(map, [1, 1]),
            count(map, [3, 1]),
            count(map, [5, 1]),
            count(map, [7, 1]),
            count(map, [1, 2]),
        ];
        expect(product(trees)).toBe(6050183040);
    });
});
