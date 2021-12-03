function mostCommon(digit: number, numbers: string[]): number {
  const map: Record<string, number> = { '0': 0, '1': 0 };
  for (const num of numbers) map[`${num[digit]}`]++;
  return map[0] > map[1] ? 0 : 1;
}

function leastCommon(digit: number, numbers: string[]): number {
  const map: Record<string, number> = { '0': 0, '1': 0 };
  for (const num of numbers) map[`${num[digit]}`]++;
  return map[1] < map[0] ? 1 : 0;
}

function mostCommonDigits(numbers: string[]): string {
  let common = '';
  for (let i = 0; i < numbers[0].length; i++) {
    common += mostCommon(i, numbers);
  }
  return common;
}

function invert(number: string): string {
  let inverse = '';
  for (let i = 0; i < number.length; i++) {
    inverse += number[i] === '0' ? '1' : '0';
  }
  return inverse;
}

export function one(input: string): number {
  const binaryNumbers = input.split('\n');
  const gammaRate = mostCommonDigits(binaryNumbers);
  const epsilonRate = invert(gammaRate);
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

export function two(input: string): number {
  const binaryNumbers = input.split('\n');
  const digits = binaryNumbers[0].length;

  function recurse(
    fn: (digit: number, numbers: string[]) => number,
    digit: number,
    numbers: string[]
  ): string[] {
    const bit = fn(digit, numbers).toString();
    const matching = numbers.filter((num) => num[digit] === bit);
    return digit === digits - 1 || matching.length === 1
      ? matching
      : recurse(fn, digit + 1, matching);
  }

  const [oxygenRating] = recurse(mostCommon, 0, binaryNumbers);
  const [co2Rating] = recurse(leastCommon, 0, binaryNumbers);

  return parseInt(oxygenRating, 2) * parseInt(co2Rating, 2);
}
