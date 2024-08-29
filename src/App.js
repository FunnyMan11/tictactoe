import React, { useState } from "react";
import "./index.css"; // Updated CSS

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const { winner, winningSquares } = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`square ${winningSquares.includes(index) ? "winning-square" : ""}`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return { winner: null, winningSquares: [] };
};

export default TicTacToe;