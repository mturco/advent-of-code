type Coord = [number, number];
type Line = [Coord, Coord];

function parseLine(line: string) {
  return line
    .split(' -> ')
    .map((coord) => coord.split(',').map(Number)) as Line;
}

function markPoints(
  map: Record<string, number>,
  lines: Line[],
  diagonal: boolean
) {
  for (const [[x1, y1], [x2, y2]] of lines) {
    const isDiagonal = x1 !== x2 && y1 !== y2;
    if (!diagonal && isDiagonal) continue;

    const length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    for (let offset = 0; offset <= length; offset++) {
      const x = x1 + offset * Math.sign(x2 - x1);
      const y = y1 + offset * Math.sign(y2 - y1);
      const coord = `${x},${y}`;

      map[coord] = typeof map[coord] === 'undefined' ? 1 : map[coord] + 1;
    }
  }
}

export function one(input: string): number {
  const lines = input.split('\n').map(parseLine);
  const map: Record<string, number> = {};
  markPoints(map, lines, false);
  return Object.values(map).filter((p) => p > 1).length;
}

export function two(input: string): number {
  const lines = input.split('\n').map(parseLine);
  const map: Record<string, number> = {};
  markPoints(map, lines, true);
  return Object.values(map).filter((p) => p > 1).length;
}
