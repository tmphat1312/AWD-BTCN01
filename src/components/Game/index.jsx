import { Board } from "../Board";
import styles from "./Game.module.css";

import { useState } from "react";

function GameInfo({ history, currentMove, onJumpTo }) {
  const [sortOrder, setSortOrder] = useState("asc");
  const sortedHistory = sortOrder == "asc" ? history : history.toReversed();

  function toggleSortOrder() {
    setSortOrder((currentOrder) => (currentOrder === "asc" ? "desc" : "asc"));
  }

  // This block of code is a potential source of refactoring
  // FIXME: Make this block of code a separate component
  const moves = sortedHistory.map((entry, idx) => {
    const calculatedMove = sortOrder === "asc" ? idx : history.length - 1 - idx;

    if (calculatedMove === 0) {
      return (
        <li key={calculatedMove}>
          {currentMove === 0 ? (
            <span>You are at the game start</span>
          ) : (
            <button onClick={() => onJumpTo(0)}>Go to game start</button>
          )}
        </li>
      );
    }

    const [row, col] = calculateRowCol(
      entry,
      sortedHistory[calculatedMove - 1]
    );
    const location = `(${row}, ${col})`;
    const description = `Go to move #${calculatedMove} ${location}`;

    return (
      <li key={calculatedMove}>
        {calculatedMove === currentMove ? (
          <span>
            You are at move #{currentMove} {location}
          </span>
        ) : (
          <button onClick={() => onJumpTo(calculatedMove)}>
            {description}
          </button>
        )}
      </li>
    );
  });

  return (
    <div className={styles["game-info"]}>
      <button onClick={toggleSortOrder}>
        Sort: {sortOrder === "asc" ? "Descending" : "Ascending"}
      </button>
      <ol>{moves}</ol>
    </div>
  );
}

export function Game() {
  const [history, setHistory] = useState([Array.from({ length: 9 })]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(idx) {
    const xIsNext = currentMove % 2 === 0;
    const nextSquares = structuredClone(currentSquares);
    nextSquares[idx] = xIsNext ? "X" : "O";
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleJumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <div className={styles.game}>
      <Board
        squares={currentSquares}
        currentMove={currentMove}
        onPlay={handlePlay}
      />
      <GameInfo
        history={history}
        currentMove={currentMove}
        onJumpTo={handleJumpTo}
      />
    </div>
  );
}

function calculateRowCol(prev, next) {
  const idx = getDiffIndex(prev, next);
  return [Math.floor(idx / 3) + 1, (idx % 3) + 1];
}

function getDiffIndex(prev, next) {
  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== next[i]) {
      return i;
    }
  }

  return -1;
}
