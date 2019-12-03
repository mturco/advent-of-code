#!/usr/bin/env node

import { readFileSync } from 'fs';

(async () => {
  const [puzzle, dataset, testInput] = process.argv.slice(2);
  const solver = ((await import(`./puzzles/${puzzle}`)) as any).default;
  const data =
    dataset === 'test'
      ? testInput
      : readFileSync(`./datasets/${dataset}.txt`, { encoding: 'utf-8' });

  console.log(solver(data));
})();
