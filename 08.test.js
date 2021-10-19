// See https://adventofcode.com/2020/day/8

import { toInteger } from 'lodash';
import raw_input from './input/input_08.txt';

// prettier-ignore
const exampleCode =
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const parseCode = (str) =>
    str.split('\n').map((line) => {
        const [op, data] = line.split(' ');
        return { op, arg: toInteger(data) };
    });

const run = (code) => {
    let acc = 0;
    let ptr = 0;
    const trace = [];
    while (ptr < code.length && !trace.includes(ptr)) {
        trace.push(ptr);
        const inst = code[ptr];
        if (inst.op === 'nop') {
            ptr++;
        } else if (inst.op === 'acc') {
            acc += inst.arg;
            ptr++;
        } else if (inst.op === 'jmp') {
            ptr += inst.arg;
        } else {
            break;
        }
    }
    return acc;
};

describe('Day 8', () => {
    test('Example 1', () => {
        const instructions = parseCode(exampleCode);
        const value = run(instructions);
        expect(value).toBe(5);
    });

    test('Example 2', () => {
        const instructions = parseCode(exampleCode);
        // patch
        instructions[7].op = 'nop';
        const value = run(instructions);
        expect(value).toBe(8);
    });

    test('Part 1', () => {
        const instructions = parseCode(raw_input);
        const value = run(instructions);
        expect(value).toBe(1709);
    });

    test('Part 2', () => {
        // lol, hack job to find the offending instruction
        // const bak = parseCode(raw_input);
        // for (let i = 0; i < bak.length; i++) {
        //     const instructions = parseCode(raw_input);
        //     if (instructions[i].op === 'nop') {
        //         instructions[i].op = 'jmp';
        //     } else if (instructions[i].op === 'jmp') {
        //         instructions[i].op = 'nop';
        //     }
        //     const v = run(instructions);
        //     if (v === -1) {
        //         console.log('exited', i);
        //         break;
        //     }
        // }

        const instructions = parseCode(raw_input);
        // patch
        instructions[381].op = 'nop';
        const value = run(instructions);
        expect(value).toBe(1976);
    });
});
