import React, { useState } from "react";

function Startmenu({ startPlayer, setGameMode, onStartGame }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameMode, setLocalGameMode] = useState("1v1"); 

  const handlePlayClick = () => {
    setIsPlaying(true); 
    const randomPlayer = Math.random() < 0.5 ? "R" : "Y"; 
    startPlayer(randomPlayer); 
    setGameMode(gameMode); 
    onStartGame();
  };

  const toggleGameMode = () => {
    const newMode = gameMode === "1v1" ? "1vCPU" : "1v1";
    setLocalGameMode(newMode); 
    
  };

  return (
    <header className="w-full h-screen flex items-center justify-center bg-blue-950 text-black">
  <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md">
    {!isPlaying && (
      <>
        {/* Botão de iniciar */}
        <div className="flex items-center justify-center mb-6">
          <button onClick={handlePlayClick} className="flex flex-col items-center">
            <img
              src="/play.png"
              alt="Play"
              className="w-20 h-20 hover:scale-105 transition duration-200 cursor-pointer"
            />
            <span className="mt-2 text-lg font-bold">Start Game</span>
          </button>
        </div>

        {/* Toggle Switch para escolher o modo de jogo */}
        <div className="flex items-center justify-center mt-4">
          <span className="text-center mr-4">1v1</span>
          <div
            className={`relative w-14 h-8 flex items-center bg-gray-400 rounded-full cursor-pointer ${
              gameMode === "1vCPU" ? "bg-blue-500" : "bg-gray-400"
            }`}
            onClick={toggleGameMode}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                gameMode === "1vCPU" ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span className="text-center ml-4">1vCPU</span>
        </div>
      </>
    )}
  </div>
</header>

  );
}

export default Startmenu;