type Point = [number, number];

const pointToCoord = (point: Point): string => point.join(',');

const coordToPoint = (coord: string): Point =>
  coord.split(',').map(Number) as Point;

const manhattanDistance = (point: Point): number =>
  Math.abs(point[0]) + Math.abs(point[1]);

export const plot = (moves: string[]): Map<string, number> => {
  const points = new Map<string, number>();
  let steps = 0;
  let current: Point = [0, 0];

  const walk = (position: Point, dir: string, dist: number) => {
    if (!dist) return;
    const [x, y] = position;

    switch (dir) {
      case 'U':
        current = [x, y + 1];
        break;
      case 'D':
        current = [x, y - 1];
        break;
      case 'L':
        current = [x - 1, y];
        break;
      case 'R':
        current = [x + 1, y];
        break;
    }

    points.set(pointToCoord(current), ++steps);
    walk(current, dir, dist - 1);
  };

  moves.forEach(move => walk(current, move[0], Number(move.slice(1))));
  return points;
};

export default (input: string): number => {
  const [lineA, lineB] = input.split('\n').map(line => plot(line.split(',')));

  return Array.from(lineA.keys()).reduce((shortestDist, coord) => {
    if (!lineB.has(coord)) return shortestDist;
    const dist = manhattanDistance(coordToPoint(coord));
    return dist < shortestDist ? dist : shortestDist;
  }, Infinity);
};
