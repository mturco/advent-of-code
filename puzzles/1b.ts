import { toNumberArray } from '../utils';
import { calcFuel } from './1a';

const recursiveCalcFuel = (mass: number): number => {
  const fuel = calcFuel(mass);
  return fuel < 0 ? 0 : fuel + recursiveCalcFuel(fuel);
};

export default (input: string): number =>
  toNumberArray(input).reduce((acc, mass) => acc + recursiveCalcFuel(mass), 0);
