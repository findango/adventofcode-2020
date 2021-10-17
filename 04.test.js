// See https://adventofcode.com/2020/day/4

import { filter, isEmpty, has, map, toInteger, keys } from 'lodash';
import raw_input from './input/input_04.txt';

const testInput = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`;

const testValidation = `
eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
`;

const nonEmpty = (v) => !isEmpty(v);

const parsePassport = (str) => {
    const fields = str.split(/\s/).filter(nonEmpty);
    return fields.reduce((acc, f) => {
        const [key, value] = f.split(':');
        acc[key] = value;
        return acc;
    }, {});
};

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.
const fields = {
    byr: (fv) => {
        const year = toInteger(fv);
        return 1920 <= year && year <= 2002;
    },
    iyr: (fv) => {
        const year = toInteger(fv);
        return 2010 <= year && year <= 2020;
    },
    eyr: (fv) => {
        const year = toInteger(fv);
        return 2020 <= year && year <= 2030;
    },
    hgt: (fv) => {
        const [_, h, units] = fv.match(/(\d+)(cm|in)/) || [];
        const height = toInteger(h);
        if (units === 'cm') return 150 <= height && height <= 193;
        if (units === 'in') return 59 <= height && height <= 76;
        return false;
    },
    hcl: (fv) => /^#[a-f0-9]{6}$/.test(fv),
    ecl: (fv) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(fv),
    pid: (fv) => /^[0-9]{9}$/.test(fv),
    cid: () => true,
};

const validatePassport = (checkFields) => (passport) => {
    for (const f of keys(fields)) {
        if (f === 'cid') continue;
        const validateField = fields[f];
        if (!passport[f]) return false;
        if (checkFields && !validateField(passport[f])) return false;
    }
    return true;
};

describe('Day 4', () => {
    test('Example 1', () => {
        const records = testInput.split('\n\n');
        const passports = map(records, parsePassport);
        const valids = filter(passports, validatePassport(false));
        expect(valids.length).toBe(2);
    });

    test('Example 2', () => {
        const records = testValidation.split('\n\n');
        const passports = map(records, parsePassport);
        const valids = filter(passports, validatePassport(true));
        expect(valids.length).toBe(4);
    });

    test('Part 1', () => {
        const records = raw_input.split('\n\n');
        const passports = map(records, parsePassport);
        const valids = filter(passports, validatePassport(false));
        expect(valids.length).toBe(192);
    });

    test('Part 2', () => {
        const records = raw_input.split('\n\n');
        const passports = map(records, parsePassport);
        const valids = filter(passports, validatePassport(true));
        expect(valids.length).toBe(101);
    });
});
