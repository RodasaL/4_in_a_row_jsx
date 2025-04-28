import { useEffect, useState } from "react";

function PlayerNames({ onNamesSet, gameMode }) {
  const [nameR, setNameR] = useState("");
  const [nameY, setNameY] = useState("");

  // ✅ Seta automaticamente o nome do jogador 2 como "CPU" no modo 1vCPU
  useEffect(() => {
    if (gameMode === "1vCPU") {
      setNameY("CPU");
    }
  }, [gameMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameR.trim() && (gameMode === "1v1" ? nameY.trim() : true)) {
      onNamesSet({ R: nameR, Y: nameY });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 text-white mb-4"
    >
      <h2 className="text-xl font-semibold"> Introduz os nomes dos jogadores:</h2>

      <input
        type="text"
        placeholder="Nome do jogador 1"
        value={nameR}
        onChange={(e) => setNameR(e.target.value)}
        className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-500"
        required
      />

      {gameMode === "1v1" && (
        <input
          type="text"
          placeholder="Nome do jogador 2"
          value={nameY}
          onChange={(e) => setNameY(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-500"
          required
        />
      )}

      <button
        type="submit"
        className="px-6 py-2 mt-2 rounded bg-green-600 hover:bg-green-700 transition font-bold cursor-pointer"
      >
        Começar Jogo
      </button>
    </form>
  );
}

export default PlayerNames;
