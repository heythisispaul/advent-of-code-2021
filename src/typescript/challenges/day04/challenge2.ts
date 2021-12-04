type BingoValue = { value: number, called: boolean };
type BingoRow = [BingoValue, BingoValue, BingoValue, BingoValue, BingoValue];
type BingoBoard = [BingoRow, BingoRow, BingoRow, BingoRow, BingoRow];
type WinningBoardState = { winningNumber: number, sumOfUncalled: number };

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

const checkForWinner = (boards: BingoBoard[]) => boards.filter((board) => {
  const horizontal = board.some((row) => row.every(({ called }) => called));
  const vertical = board.some((_, index) => board.every((row) => row[index].called));
  return horizontal || vertical;
});

export default (input: string) => {
  const winningBoards = new Set<string>();
  const winningBoardStates: Record<string, WinningBoardState> = {};

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
    const affectedBoardsWithWins = checkForWinner(affectedBoards);

    affectedBoardsWithWins.forEach((winningBoard) => {
      const valuesOnlyBoard = JSON.stringify(winningBoard.map((row) => row.map(({ value }) => value)));
      if (!winningBoards.has(valuesOnlyBoard)) {
        winningBoards.add(valuesOnlyBoard);

        const sumOfUncalled = winningBoard
          .flat()
          .reduce((total, { called, value }) => (
            total += !called ? value : 0
          ), 0);

        winningBoardStates[valuesOnlyBoard] = { winningNumber: bingoNumber, sumOfUncalled };
      }
    });
  }

  const arrayOfWinners = Array.from(winningBoards);
  const lastWinner = arrayOfWinners[arrayOfWinners.length - 1];
  const { winningNumber, sumOfUncalled } = winningBoardStates[lastWinner];

  return sumOfUncalled * winningNumber;
};
