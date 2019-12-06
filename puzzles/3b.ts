import { plot } from './3a';

export default (input: string): number => {
  const [lineA, lineB] = input.split('\n').map(line => plot(line.split(',')));

  return Array.from(lineA.keys()).reduce((leastSteps, coord) => {
    if (!lineB.has(coord)) return leastSteps;
    const steps = lineA.get(coord) + lineB.get(coord);
    return steps < leastSteps ? steps : leastSteps;
  }, Infinity);
};
