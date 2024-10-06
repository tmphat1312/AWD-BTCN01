const WINNING_CROSSES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(squares) {
  console.log(squares);
  for (const [a, b, c] of WINNING_CROSSES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        name: squares[a],
        winningSquares: [a, b, c],
      };
    }
  }

  return null;
}
