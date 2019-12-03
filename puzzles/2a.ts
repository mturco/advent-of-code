import { toNumberArray } from '../utils';

export const processIntcode = (
  intcode: number[],
  address: number
): number[] => {
  const operation = intcode[address];
  switch (operation) {
    case 1: {
      const [pos1, pos2, res] = intcode.slice(address + 1);
      intcode[res] = intcode[pos1] + intcode[pos2];
      return processIntcode(intcode, address + 4);
    }

    case 2: {
      const [pos1, pos2, res] = intcode.slice(address + 1);
      intcode[res] = intcode[pos1] * intcode[pos2];
      return processIntcode(intcode, address + 4);
    }
  }
  return intcode;
};

export default (input: string): number => {
  const [result] = processIntcode(toNumberArray(input, ','), 0);
  return result;
};
