function parseCmd(cmd: string) {
  const [dir, distString] = cmd.split(' ');
  return {
    dir,
    dist: Number(distString),
  };
}

export function one(input: string): number {
  const cmds = input.split('\n').map(parseCmd);
  let h = 0;
  let d = 0;

  for (const { dir, dist } of cmds) {
    switch (dir) {
      case 'forward':
        h += dist;
        break;
      case 'up':
        d -= dist;
        break;
      case 'down':
        d += dist;
        break;
      default:
      // no-op
    }
  }

  return h * d;
}

export function two(input: string): number {
  const cmds = input.split('\n').map(parseCmd);
  let h = 0;
  let d = 0;
  let aim = 0;

  for (const { dir, dist } of cmds) {
    switch (dir) {
      case 'forward':
        h += dist;
        d += dist * aim;
        break;
      case 'up':
        aim -= dist;
        break;
      case 'down':
        aim += dist;
        break;
      default:
      // no-op
    }
  }

  return h * d;
}
