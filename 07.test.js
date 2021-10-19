// See https://adventofcode.com/2020/day/7

import { forEach, includes, isEmpty, keys, pickBy, toInteger, without } from 'lodash';
import raw_input from './input/input_07.txt';

const exampleInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const exampleInput3 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

const parseConditions = (str) =>
    str.split(', ').reduce((acc, c) => {
        const [_, count, color] = c.match(/^(\d+) (.*) bag[s]?$/) || [];
        if (color) {
            acc[color] = toInteger(count);
        }
        return acc;
    }, {});

const parseRules = (str) =>
    str.split('\n').reduce((acc, r) => {
        const [_, color, rest] = r.match(/^(.*) bags contain (.*)\.$/);
        const conditions = parseConditions(rest);
        acc[color] = conditions;
        return acc;
    }, {});

const canContain = (color, rules) => keys(pickBy(rules, (r) => includes(keys(r), color)));

const findAllContainers = (color, rules) => {
    const found = [];
    const next = [color];
    while (!isEmpty(next)) {
        const nextColor = next.pop();
        const containers = without(canContain(nextColor, rules), ...found);
        found.push(...containers);
        next.push(...containers);
    }
    return found;
};

const totalContained = (color, rules) => {
    let total = 0;
    const next = [[color, 1]];
    while (!isEmpty(next)) {
        const [thisColor, mult] = next.pop();
        const children = rules[thisColor];
        forEach(children, (count, nextColor) => {
            total += count * mult;
            next.push([nextColor, count * mult]);
        });
    }
    return total;
};

describe('Day 7', () => {
    test('Example 1', () => {
        const rules = parseRules(exampleInput);
        const containers = findAllContainers('shiny gold', rules);
        expect(containers).toEqual(['bright white', 'muted yellow', 'light red', 'dark orange']);
    });

    test('Example 2', () => {
        const rules = parseRules(exampleInput);
        const total = totalContained('shiny gold', rules);
        expect(total).toEqual(32);
    });

    test('Example 3', () => {
        const rules = parseRules(exampleInput3);
        const total = totalContained('shiny gold', rules);
        expect(total).toEqual(126);
    });

    test('Part 1', () => {
        const rules = parseRules(raw_input);
        const containers = findAllContainers('shiny gold', rules);
        expect(containers.length).toBe(248);
    });

    test('Part 2', () => {
        const rules = parseRules(raw_input);
        const total = totalContained('shiny gold', rules);
        expect(total).toBe(57281);
    });
});
