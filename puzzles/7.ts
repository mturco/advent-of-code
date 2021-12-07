function parseInput(input: string): number[] {
  return input
    .split(',')
    .map(Number)
    .sort((a, b) => b - a);
}

function calcFuel(positions: number[], dest: number): number {
  return positions.reduce((fuel, pos) => fuel + Math.abs(pos - dest), 0);
}

function calcNonlinearTrip(distance: number): number {
  let fuel = 0;
  for (let d = 1; d <= distance; d++) {
    fuel += d;
  }
  return fuel;
}

function calcNonlinearFuel(positions: number[], dest: number): number {
  return positions.reduce(
    (fuel, pos) => fuel + calcNonlinearTrip(Math.abs(pos - dest)),
    0
  );
}

// Assumes sorted input array
function median(values: number[]): number {
  if (!values.length) return 0;
  const mid = Math.floor(values.length / 2);
  return values.length % 2 === 0
    ? (values[mid] + values[mid + 1]) / 2
    : values[mid];
}

function mean(values: number[]): number {
  const sum = values.reduce((acc, cv) => acc + cv, 0);
  return sum / values.length;
}

export function one(input: string): number {
  const positions = parseInput(input);
  const medianPosition = median(positions);

  if (medianPosition === Math.trunc(medianPosition)) {
    return calcFuel(positions, medianPosition);
  } else {
    return Math.min(
      calcFuel(positions, medianPosition - 0.5),
      calcFuel(positions, medianPosition + 0.5)
    );
  }
}

export function two(input: string) {
  const positions = parseInput(input);
  const meanPosition = mean(positions);

  if (meanPosition === Math.trunc(meanPosition)) {
    return calcNonlinearFuel(positions, meanPosition);
  } else {
    return Math.min(
      calcNonlinearFuel(positions, Math.floor(meanPosition)),
      calcNonlinearFuel(positions, Math.ceil(meanPosition))
    );
  }
}
