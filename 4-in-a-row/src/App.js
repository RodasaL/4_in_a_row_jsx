import { useState } from "react";
import GameBoard from "./components/gameboard/gameboard.component";
import PlayerNames from "./components/playernames/playernames.component";
import Startmenu from "./components/startmenu/startmenu.component";

function App() {
  const [playerNames, setPlayerNames] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [gameMode, setGameMode] = useState("1v1");
  const [hasNames, setNames] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); 

  return (
    <div id="container" className="bg-blue-950 h-screen overflow-hidden">
      {!isPlaying ? (
        !hasNames ? (
          <Startmenu
            startPlayer={setCurrentPlayer}
            setGameMode={setGameMode}
            onStartGame={() => setNames(true)}
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
              setNames(false);
              setIsPlaying(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
