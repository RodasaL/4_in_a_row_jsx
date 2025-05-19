import { useEffect, useState } from "react";
import Board from "../board/board.component";
import Timers from "../timers/timers.component";
import Indicator from "../indicator/indicator.component";

function GameBoard({
  playerNames,
  currentPlayer: initialPlayer,
  gameMode,
  onExit,
}) {
  const numRows = 6;
  const numCols = 7;
  const [resetSignal, setResetSignal] = useState(0);
  const [stopSignal, setStopSignal] = useState(0);
  const [randomcolor, setRandomColor] = useState(null);
  const [winner, setWinner] = useState(0);
  const [showEndMenu, setShowEndMenu] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  const [hoverCol, setHoverCol] = useState(null);
  const [nspecialCells, setnumberSpecialCells] = useState(0); // Estado para as celulas especiais
  const [specialCells, setSpecialCells] = useState([]);  // array de células especiais
  const [board, setBoard] = useState(
    Array.from({ length: numRows }, () => Array(numCols).fill(null))
  );
  const [plays, setPlays] = useState(0);

  
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer); 
  useEffect(() => {
    console.log("Jogadas:", plays);
  },[plays]);
  useEffect(() => {
    const totalCells = numRows * numCols;
    const usedPositions = new Set();

    while (usedPositions.size < 5) {
      const randIndex = Math.floor(Math.random() * totalCells);
      usedPositions.add(randIndex);
    }

    const specials = Array.from(usedPositions).map((index) => [
      Math.floor(index / numCols),
      index % numCols,
    ]);

    setSpecialCells(specials);

    setRandomColor(Math.floor(Math.random() * 2)); // 0 ou 1

    if (gameMode === "1vCPU") {
      setCurrentPlayer("R"); 
    }
  }, [nspecialCells]);

  useEffect(() => {
    if (!winner) {
      checkWinner(); 
    }

    if (plays === 42 && winner === 0) {
      setTimeout(() => {
        const validCols = [];
        for (let col = 0; col < numCols; col++) {
          if (board[0][col] === null) {
            validCols.push(col);
          }
        }

        if (validCols.length === 0) {
          setWinner(1); 
          setWinnerName("Empate"); 
          setShowEndMenu(true); 
          setStopSignal((prev) => prev + 1); 
          console.log("Empate!");
        }
        else {
          console.log(`Playstest ${plays}`);
        }
      }, 1000);
    }
    
    if (currentPlayer === "Y" && gameMode === "1vCPU" && !winner) {
      cpuMove(); 
    }
  }, [currentPlayer, board]);

  const switchPlayer = () => {
    setCurrentPlayer((prev) => (prev === "R" ? "Y" : "R"));
  };

  const dropDisc = (col) => {
    const newBoard = board.map((r) => [...r]);

    for (let row = numRows - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        console.log("Jogada feita na coluna:", col, "por", currentPlayer);
        const isSpecial = specialCells.some(
          ([r, c]) => r === row && c === col
        );

        if (!isSpecial) {
          switchPlayer(); 
        } else {
          setResetSignal((prev) => prev + 1); 
          console.log("Jogada especial! Joga outra vez!");
        }
        setPlays((prev) => prev + 1); 
        return;
      }
    }

    console.log("Coluna cheia!");
  };

  const cpuMove = () => {
    if (gameMode === "1vCPU" && currentPlayer === "Y") {
      const timeout = setTimeout(() => {
        const validCols = [];
        for (let col = 0; col < numCols; col++) {
          if (board[0][col] === null) {
            validCols.push(col);
          }
        }

        if (validCols.length > 0) {
          const randomCol =
            validCols[Math.floor(Math.random() * validCols.length)];
          dropDisc(randomCol);
        } else {
          console.log("O tabuleiro está cheio, o CPU não pode jogar.");
        }
      }, 2000); 

      return () => clearTimeout(timeout);
    }
  };

  const checkWinner = () => {
    const directions = [
      { r: 0, c: 1 }, // Horizontal 
      { r: 1, c: 0 }, // Vertical 
      { r: 1, c: 1 }, // Diagonal D
      { r: 1, c: -1 }, // Diagonal E
    ];

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const cell = board[row][col];
        if (!cell) continue;

        for (const { r, c } of directions) {
          let count = 1;
          for (let i = 1; i < 4; i++) {
            const newRow = row + r * i;
            const newCol = col + c * i;

            if (
              newRow >= 0 &&
              newRow < numRows &&
              newCol >= 0 &&
              newCol < numCols &&
              board[newRow][newCol] === cell
            ) {
              count++;
            } else {
              break;
            }
          }

          if (count === 4) {
            setStopSignal((prev) => prev + 1); 
      
    
            const newBoard = board.map((r) => [...r]);
            for (let p = 0; p < numRows; p++) {
              for (let q = 0; q < numCols; q++) {
                newBoard[p][q] = "F";
              }
            }

            for (let i = 0; i < 4; i++) {
              const winRow = row + r * i;
              const winCol = col + c * i;
              newBoard[winRow][winCol] = cell === "R" ? "R" : "Y";
            }
            setBoard(newBoard);
            setWinner(1);

            setTimeout(() => {
              if (cell === "R") {
                setWinnerName(playerNames.R); 
                setShowEndMenu(true); 
              } else {
                setWinnerName(playerNames.Y); 
                setShowEndMenu(true); 
              }
            }, 2500);
            return cell;
          }
        }
      }
    }
    return null;
  };

  const resetgame = () => {
    setBoard(Array.from({ length: numRows }, () => Array(numCols).fill(null)));
    setPlays(0); 
    setCurrentPlayer(initialPlayer); 
    setWinner(0);
    setResetSignal((prev) => prev + 1);
    setStopSignal((prev) => 0); 
    setnumberSpecialCells((prev) => prev + 1); 
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-blue-950">
      {showEndMenu && (
        <div className="fixed top-0 left-0 w-full bg-black text-white py-4 px-8 text-center z-50 animate-slide-down shadow-lg ">
          <h2 className="text-xl font-bold">
            {winnerName === "Empate"
              ? "O jogo terminou em empate!"
              : `🏆 ${winnerName} venceu o jogo!`}
          </h2>
          <button
            className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded cursor-pointer"
            onClick={() => {
              resetgame();
              setShowEndMenu(false);
            }}
          >
            Jogar novamente
          </button>
          <button
            className="mt-2 px-4 py-2 bg-green-700 hover:bg-green-900 rounded cursor-pointer ml-1"
            onClick={() => {
              onExit(); 
            }}
          >
            Sair
          </button>
        </div>
      )}
   
      <Timers
        currentPlayer={currentPlayer}
        onTimeout={switchPlayer}
        name1={playerNames.R}
        name2={playerNames.Y}
        resetSignal={resetSignal} 
        stopSignal={stopSignal}
        color={randomcolor} 
      />

      <div className="relative w-full max-w-[600px] aspect-[7/6] mb-23 pt-6">
        <Board />
        <Indicator hoverCol={hoverCol} numCols={numCols} />
        {/* Grid fichas */}
        <div
          className="absolute grid grid-cols-7 grid-rows-6 z-10"
          style={{
            left: "7.2%",
            top: "8%",
            width: "86%",
            height: "84.5%",
          }}
        >
          {board.flat().map((cell, i) => {
            const row = Math.floor(i / numCols);
            const col = i % numCols;

            const isSpecial = specialCells.some(
              ([r, c]) => r === row && c === col
            );

            return (
              <div key={i} className="flex items-center justify-center">
                {cell && (
                  <div
                    className={`w-[97%] aspect-square rounded-full shadow-md ${
                      cell === "R"
                        ? randomcolor === 1
                          ? "bg-red-500"
                          : "bg-green-500"
                        : cell === "Y"
                        ? randomcolor === 1
                          ? "bg-yellow-400"
                          : "bg-white"
                        : "bg-black" 
                    }`}
                  />
                )}

                {/* Special cells */}
                {!cell && isSpecial && (
                  <div className="w-[86%] aspect-square rounded-full bg-purple-700 opacity-92 shadow-md outline-4 outline-pink-800 " />
                )}
              </div>
            );
          })}
        </div>

        {/* Cols clicáveis */}
        <div
          className="absolute z-20"
          style={{
            left: "7%",
            top: "6.5%",
            width: "86%",
            height: "87%",
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
          }}
        >
          {Array(numCols)
            .fill(0)
            .map((_, col) => (
              <div
                key={col}
                className="cursor-pointer"
                onMouseEnter={() => setHoverCol(col)}
                onMouseLeave={() => setHoverCol(null)}
                onClick={() => {
                  if (gameMode === "1vCPU" && currentPlayer === "Y") {
                    return console.log("Vez do Cpu"); 
                  } else if (winner) {
                    return console.log("Jogo terminado!"); 
                  } else {
                    dropDisc(col);
                  }
                }}
              />
            ))}
        </div>
      </div>
      </div>
  );
}

export default GameBoard;
