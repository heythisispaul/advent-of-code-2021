type BingoValue = { value: number, called: boolean };
type BingoRow = [BingoValue, BingoValue, BingoValue, BingoValue, BingoValue];
type BingoBoard = [BingoRow, BingoRow, BingoRow, BingoRow, BingoRow];

const impurelyGetAffectedBoards = (boards: BingoBoard[], bingoNumber: number) => {
  let affectedBoards = [] as BingoBoard[];
  boards.forEach((board) => {
    const isAffected = board.flat().some(({ value }) => value === bingoNumber);
    if (isAffected) {
      board.forEach((row, yIndex) => {
        row.forEach((bingoValue, xIndex) => {
          if (bingoValue.value === bingoNumber) {
            board[yIndex][xIndex].called = true;
          }
        });
      });
      affectedBoards.push(board);
    }
  });
  return affectedBoards;
};

const checkForWinner = (boards: BingoBoard[]) => boards.find((board) => {
  const horizontal = board.some((row) => row.every(({ called }) => called));
  const vertical = board.some((_, index) => board.every((row) => row[index].called));
  return horizontal || vertical;
});

export default (input: string) => {
  let winningBoard = undefined;
  let winningNumber = 1;

  const inputLines = input.split('\n');
  const bingoNumbers = inputLines[0].split(',').map(parseFloat);

  const boards = inputLines.slice(2).reduce((boards: BingoRow[][], potentialNumStringRow) => {
    if (potentialNumStringRow) {
      const row = potentialNumStringRow.split(' ').map((numString) => ({
        value: parseInt(numString.trim()),
        called: false,
      })).filter(({ value }) => !isNaN(value)) as BingoRow;

      boards[boards.length - 1].push(row);
      return boards;
    }
    boards.push([]);
    return boards;
  }, [[]]) as BingoBoard[];

  for (const bingoNumber of bingoNumbers) {
    const affectedBoards = impurelyGetAffectedBoards(boards, bingoNumber);
    winningBoard = checkForWinner(affectedBoards);
    if (winningBoard) {
      winningNumber = bingoNumber;
      break;
    }
  }

  const sumOfUncalledOnWinningBoard = (winningBoard || [[]])
    .flat()
    .reduce((total, { called, value }) => (
      total += !called ? value : 0
    ), 0);

  return sumOfUncalledOnWinningBoard * winningNumber;
};
