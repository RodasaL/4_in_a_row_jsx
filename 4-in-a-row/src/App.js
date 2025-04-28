import { useState } from "react";
import Header from "./components/header/header.component";
import GameBoard from "./components/gameboard/gameboard.component";
import PlayerNames from "./components/playernames/playernames.component";

function App() {
  const [playerNames, setPlayerNames] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameMode, setGameMode] = useState("1v1");
  const [isAskingNames, setIsAskingNames] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // 👈 novo estado

  return (
    <div id="container" className="bg-blue-950 h-screen overflow-hidden">
      {!isPlaying ? (
        !isAskingNames ? (
          <Header
            startPlayer={setCurrentPlayer}
            setGameMode={setGameMode}
            onStartGame={() => setIsAskingNames(true)}
          />
        ) : !playerNames ? (
          <PlayerNames
            onNamesSet={(names) => {
              setPlayerNames(names);
              setIsPlaying(true); //  começa o jogo
            }}
            gameMode={gameMode}
          />
        ) : null
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-blue-950 p-4">
          <GameBoard
            playerNames={playerNames}
            currentPlayer={currentPlayer}
            gameMode={gameMode}
            onExit={() => {
              //  reset  limpar tudo
              setPlayerNames(null);
              setCurrentPlayer(null);
              setIsAskingNames(false);
              setIsPlaying(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
