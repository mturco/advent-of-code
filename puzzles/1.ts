import { toNumberArray } from '../utils';

export function one(input: string): number {
  const depths = toNumberArray(input);

  let increases = 0;
  let last = depths[0];
  for (const depth of depths) {
    if (depth > last) {
      increases++;
    }
    last = depth;
  }

  return increases;
}

export function two(input: string): number {
  const depths = toNumberArray(input);
  let increases = 0;
  let lastMovingAvg = depths[0] + depths[1] + depths[2];

  for (let i = 3; i <= depths.length; i++) {
    const movingAvg = depths[i - 2] + depths[i - 1] + depths[i];

    if (movingAvg > lastMovingAvg) {
      increases++;
    }
    lastMovingAvg = movingAvg;
  }

  return increases;
}
