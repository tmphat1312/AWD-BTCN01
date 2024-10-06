import styles from "./Square.module.css";

export function Square({ value, isWinningSquare, onSquareClick }) {
  return (
    <button
      className={styles.square}
      onClick={onSquareClick}
      data-winning={isWinningSquare}
    >
      {value}
    </button>
  );
}
