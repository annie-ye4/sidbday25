import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Puzzle.css';

const Puzzle = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 12 }, () => Array(18).fill({ value: '', smallNumber: null }))
  );

  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const solution = JSON.parse(process.env.REACT_APP_SOLUTION);

  const unusedCells = new Set([
    '0-0', '0-1', '0-2', '0-3', '0-4', '0-5', '0-6', '0-7', '0-8', '0-9', '0-10', '0-11', '0-12', '0-13', '0-15', '0-16', '0-17',
    '1-0', '1-1', '1-2', '1-3', '1-4', '1-5', '1-7', '1-8', '1-9', '1-10', '1-12', '1-13', '1-15', '1-16', '1-17',
    '2-8', '2-9', '2-10', '2-12', '2-13', '2-15', '2-16', '2-17',
    '3-0', '3-1', '3-2', '3-3', '3-4', '3-5', '3-7', '3-8', '3-9',
    '4-0', '4-1', '4-2', '4-4', '4-5', '4-7', '4-8', '4-9', '4-10', '4-12', '4-13', '4-14', '4-15', '4-16', '4-17',
    '5-0', '5-1', '5-2', '5-4', '5-5', '5-7', '5-8', '5-9', '5-10', '5-12', '5-13', '5-14', '5-15', '5-16', '5-17',
    '6-0', '6-1', '6-2', '6-4', '6-5', '6-7', '6-8', '6-9', '6-10', '6-12', '6-13', '6-14', '6-15', '6-16', '6-17',
    '7-0', '7-1', '7-2', '7-12', '7-13', '7-14', '7-15', '7-16', '7-17',
    '8-0', '8-1', '8-2', '8-4', '8-5', '8-7', '8-8', '8-9', '8-10', '8-12', '8-13', '8-14', '8-15', '8-16',
    '9-0', '9-1', '9-2', '9-4', '9-5', '9-7', '9-8', '9-9', '9-10',
    '10-0', '10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7', '10-8', '10-9', '10-10', '10-12', '10-13', '10-14', '10-15', '10-16', 
    '11-0', '11-13', '11-14', '11-15', '11-16', '11-17',
  ]);

  const handleCellChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], value: value.toUpperCase() };
    setGrid(newGrid);
  };

  const handleSmallNumberChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col] = { ...newGrid[row][col], smallNumber: value };
    setGrid(newGrid);
  };

  const checkAnswers = () => {
    // Play sound when button is clicked
    const sound = new Audio('ignition-sound.mp3'); // Adjust the path to your sound file
    sound.play();

    let isCorrect = true;
    for (let row = 0; row < solution.length; row++) {
      for (let col = 0; col < solution[row].length; col++) {
        if (solution[row][col] && grid[row][col].value !== solution[row][col]) {
          isCorrect = false;
        }
      }
    }
    if (isCorrect) {
      navigate('/intro');
    } else {
      alert('wrong!!!');
    }
  };

  const isUnusedCell = (row, col) => unusedCells.has(`${row}-${col}`);

  const findNextUsedCell = (row, col, direction) => {
    while (true) {
      if (direction === 'up') row--;
      if (direction === 'down') row++;
      if (direction === 'left') col--;
      if (direction === 'right') col++;

      if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) break;
      if (!isUnusedCell(row, col)) return { row, col };
    }
    return { row: activeCell.row, col: activeCell.col };
  };

  // Focus on the active cell when it's clicked or updated
  useEffect(() => {
    const input = document.getElementById(`cell-${activeCell.row}-${activeCell.col}`);
    if (input) input.focus();
  }, [activeCell]);

  // Handle key down events to move the focus on valid cells
  const handleKeyDown = (e) => {
    let newRow = activeCell.row;
    let newCol = activeCell.col;

    switch (e.key) {
      case 'ArrowUp':
        newRow = findNextUsedCell(newRow, newCol, 'up').row;
        break;
      case 'ArrowDown':
        newRow = findNextUsedCell(newRow, newCol, 'down').row;
        break;
      case 'ArrowLeft':
        newCol = findNextUsedCell(newRow, newCol, 'left').col;
        break;
      case 'ArrowRight':
        newCol = findNextUsedCell(newRow, newCol, 'right').col;
        break;
      default:
        return; // Ignore non-arrow key presses
    }

    setActiveCell({ row: newRow, col: newCol });
  };

  // Handle cell click to set the focus to the clicked cell
  const handleCellClick = (row, col) => {
    setActiveCell({ row, col });
  };

  useEffect(() => {
    handleSmallNumberChange(0, 14, 1);
    handleSmallNumberChange(1, 6, 2);
    handleSmallNumberChange(1, 11, 3);
    handleSmallNumberChange(2, 0, 4);
    handleSmallNumberChange(3, 10, 5);
    handleSmallNumberChange(4, 3, 6);
    handleSmallNumberChange(7, 3, 7);
    handleSmallNumberChange(8, 17, 8);
    handleSmallNumberChange(9, 11, 9);
    handleSmallNumberChange(11, 1, 10);
  }, []);

  return (
    <div className="crossword-container" ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="stars">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>

      <h1>solve to get to the birthday page!</h1>

      <div className="crossword-main">
        {/* Crossword Grid */}
        <div className="crossword-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="crossword-row">
              {row.map((cell, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className="crossword-cell-wrapper">
                  <div className={`crossword-cell ${isUnusedCell(rowIndex, colIndex) ? 'unused-cell' : ''}`} onClick={() => handleCellClick(rowIndex, colIndex)}>
                    {cell.smallNumber && (
                      <span className="small-number">{cell.smallNumber}</span>
                    )}
                    <input
                      id={`cell-${rowIndex}-${colIndex}`}
                      maxLength={1}
                      value={cell.value}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      disabled={isUnusedCell(rowIndex, colIndex)}
                      tabIndex={isUnusedCell(rowIndex, colIndex) ? -1 : 0}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Hint Bank */}
        <div className="crossword-hint-bank">
          <h2>Across</h2>
          <ul>
            <li>4: name of our first stuffed animal</li>
            <li>5: where we met</li>
            <li>7: special song from a concert</li>
            <li>9: something you helped me find</li>
            <li>10: your favorite drink that looks like you</li>
          </ul>
          <h2>Down</h2>
          <ul>
            <li>1: the type of cake from valentine's day</li>
            <li>2: your morning nickname</li>
            <li>3: addictive drink that almost made me miss my train</li>
            <li>6: friend for that time of the month</li>
            <li>8: "okayyy"</li>
          </ul>
        </div>
      </div>

      {/* Check Answers Button */}
      <button className="check-answers-button" onClick={checkAnswers}>
        Check Answers
      </button>
    </div>
  );
};

export default Puzzle;
