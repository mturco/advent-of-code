const CYCLE_LENGTH = 7;
const NEW_CYCLE_LENGTH = 9;

export function one(input: string): number {
  const DAYS = 80;
  const fish = input.split(',').map(Number);

  for (let d = 1; d <= DAYS; d++) {
    const newFish = [];

    for (let f = 0; f < fish.length; f++) {
      fish[f]--;

      if (fish[f] < 0) {
        fish[f] = CYCLE_LENGTH - 1;
        newFish.push(CYCLE_LENGTH + 1);
      }
    }

    fish.push(...newFish);
  }

  return fish.length;
}

export function two(input: string): number {
  const DAYS = 256;
  const initialFish = input.split(',').map(Number);
  const stages = new Array(NEW_CYCLE_LENGTH).fill(0);

  for (let s = 0; s < CYCLE_LENGTH; s++) {
    stages[s] = initialFish.filter((f) => f === s).length;
  }

  for (let d = 1; d <= DAYS; d++) {
    const active = stages.shift();
    stages[CYCLE_LENGTH - 1] += active;
    stages[NEW_CYCLE_LENGTH - 1] = active;
  }

  return stages.reduce((acc, cv) => acc + cv, 0);
}
