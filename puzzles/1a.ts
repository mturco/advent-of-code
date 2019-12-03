import { toNumberArray } from '../utils';

export const calcFuel = (mass: number): number => Math.floor(mass / 3) - 2;

export default (input: string): number =>
  toNumberArray(input).reduce((acc, mass) => acc + calcFuel(mass), 0);
