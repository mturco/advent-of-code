import { toNumberArray } from '../utils';

export const repeatedDigit = /(\d)\1+/;

const firstDescendingDigit = (number: number): [number[], number] => {
  const digits = number
    .toString()
    .split('')
    .map(Number);
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i + 1]) {
      return [digits, i];
    }
  }
  return [digits, -1];
};

export const ascendingDigits = (number: number, index: number = 0): boolean => {
  const [x, y] = number
    .toString()
    .slice(index, index + 2)
    .split('');
  if (y === undefined) return true;
  return x > y ? false : ascendingDigits(number, index + 1);
};

export const getMin = (floor: number): number => {
  const [digits, index] = firstDescendingDigit(floor);
  return index !== -1
    ? Number(digits.fill(digits[index], index + 1).join(''))
    : floor;
};

export const getMax = (ceiling: number): number => {
  const [digits, index] = firstDescendingDigit(ceiling);
  return index !== -1
    ? Number(
        [
          ...digits.slice(0, index),
          Number(digits[index]) - 1,
          '9'.repeat(digits.length - index - 1)
        ].join('')
      )
    : ceiling;
};

export default (input: string): number => {
  const [floor, ceiling] = toNumberArray(input, '-');
  let passwords = 0;

  // calculate a "smart" minimum and maximum
  const min = getMin(floor);
  const max = getMax(ceiling);

  // brute force
  for (let x = min; x <= max; x++) {
    if (repeatedDigit.test(x.toString()) && ascendingDigits(x)) {
      passwords++;
    }
  }
  return passwords;
};
