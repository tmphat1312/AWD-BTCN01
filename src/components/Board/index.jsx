import styles from "./Board.module.css";
import { calculateWinner } from "../../utils";
import { Square } from "../Square";

export function Board({ currentMove, squares, onPlay }) {
  const isDraw = currentMove === 9;
  const xIsNext = currentMove % 2 === 0;

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner.name
    : isDraw
    ? "It's a draw!"
    : "Next player: " + (xIsNext ? "X" : "O");

  function handleClick(idx) {
    if (calculateWinner(squares) || squares[idx]) return;
    onPlay(idx);
  }

  return (
    <div className="game-board">
      <div className={styles.status}>{status}</div>
      {Array.from({ length: 3 }).map((_, row) => (
        <div className={styles["board-row"]} key={row}>
          {Array.from({ length: 3 }).map((_, col) => {
            const idx = row * 3 + col;
            return (
              <Square
                key={idx}
                value={squares[idx]}
                isWinningSquare={winner && winner.winningSquares.includes(idx)}
                onSquareClick={() => handleClick(idx)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
