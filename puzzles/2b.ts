import { toNumberArray } from '../utils';
import { processIntcode } from './2a';

const desiredResult = 19690720;

export default (input: string): number => {
  const intcode = toNumberArray(input, ',');

  for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
      const code = [intcode[0], noun, verb, ...intcode.slice(3)];
      const [result] = processIntcode(code, 0);

      if (result === desiredResult) {
        return 100 * noun + verb;
      }
    }
  }
};
