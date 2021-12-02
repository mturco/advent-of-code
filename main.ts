#!/usr/bin/env node

import { readFileSync } from 'fs';

(async () => {
  const [puzzle, testInput] = process.argv.slice(2);
  const data = testInput ?? getInput(puzzle);
  const solver = await getSolver(puzzle);

  console.log(solver(data));
})();

async function getSolver(puzzle: string): Promise<Function> {
  const { one, two } = await getSolverParts(puzzle);
  const solver = puzzle.endsWith('b') ? two : one;
  if (typeof solver !== 'function') {
    console.error(`Solution for ${puzzle} wasn't found.`);
    process.exit(1);
  }

  return solver;
}

async function getSolverParts(
  puzzle: string
): Promise<Record<'one' | 'two', Function>> {
  try {
    return await import(`./puzzles/${parseInt(puzzle, 10)}`);
  } catch {
    console.error(`Solution for ${puzzle} wasn't found.`);
    process.exit(1);
  }
}

function getInput(puzzle: string): string {
  try {
    return readFileSync(`./puzzles/${parseInt(puzzle, 10)}.txt`, {
      encoding: 'utf-8',
    });
  } catch {
    console.error(`Puzzle input for ${puzzle} wasn't found.`);
    process.exit(1);
  }
}
