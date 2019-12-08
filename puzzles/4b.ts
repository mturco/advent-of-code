import { toNumberArray } from '../utils';

import { ascendingDigits, getMax, getMin } from './4a';

export const repeatedOnceDigit = (number: number): boolean => {
  const matches = number.toString().match(/(\d)\1+/g);
  return matches?.some(match => match.length === 2);
};

export default (input: string): number => {
  const [floor, ceiling] = toNumberArray(input, '-');
  let passwords = 0;

  // calculate a "smart" minimum and maximum
  const min = getMin(floor);
  const max = getMax(ceiling);

  // brute force
  for (let x = min; x <= max; x++) {
    if (repeatedOnceDigit(x) && ascendingDigits(x)) {
      passwords++;
    }
  }
  return passwords;
};
