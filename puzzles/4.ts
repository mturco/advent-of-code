type Board = (number | 'x')[];

const BOARD_SIZE = 5;

function parseBoards(boards: string[]): Board[] {
  return boards.map((board) => board.trim().split(/\s+/).map(Number));
}

function checkBoard(board: Board): boolean {
  let rowCount = 0;
  let colCounts = new Array(BOARD_SIZE).fill(0);

  for (let i = 0; i < board.length; i++) {
    const col = i % BOARD_SIZE;
    if (col === 0) rowCount = 0;

    if (board[i] === 'x') {
      rowCount++;
      colCounts[col]++;

      if (rowCount === 5 || colCounts[col] === 5) {
        return true;
      }
    }
  }

  return false;
}

function calcScore(board: Board, finalNumber: number): number {
  const sum = board.reduce<number>((acc, cv) => {
    if (typeof cv === 'number') {
      return acc + cv;
    }
    return acc;
  }, 0);

  return sum * finalNumber;
}

export function one(input: string): number {
  const [numbersRow, ...boardRows] = input.split('\n\n');
  const numbers = numbersRow.split(',').map(Number);
  const boards = parseBoards(boardRows);

  for (const number of numbers) {
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];
      const index = board.indexOf(number);

      if (index !== -1) {
        board[index] = 'x';

        if (checkBoard(board)) {
          return calcScore(board, number);
        }
      }
    }
  }

  return -1;
}

export function two(input: string): number {
  const [numbersRow, ...boardRows] = input.split('\n\n');
  const numbers = numbersRow.split(',').map(Number);
  const boards = parseBoards(boardRows);
  const winningBoards = new Set<number>();

  for (const number of numbers) {
    for (let b = 0; b < boards.length; b++) {
      const board = boards[b];

      const index = board.indexOf(number);

      if (index !== -1) {
        board[index] = 'x';

        if (checkBoard(board)) {
          winningBoards.add(b);

          if (winningBoards.size === boards.length) {
            return calcScore(board, number);
          }
        }
      }
    }
  }

  return -1;
}
