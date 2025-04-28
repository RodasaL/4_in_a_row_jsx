import { useEffect, useRef, useState, useCallback } from "react";

function Timers({
  currentPlayer,
  onTimeout,
  name1,
  name2,
  resetSignal,
  stopSignal,
  color,
}) {
  const TEMPO_LIMITE = 10;
  const [timeR, setTimeR] = useState(0);
  const [timeY, setTimeY] = useState(0);
  const requestRef = useRef();
  const startRef = useRef(Date.now());

  const updateTime_ = useCallback(() => {
    if (stopSignal > 0)
      return; // Se o jogo estiver parado, não atualiza o timer
    else {
      const now = Date.now();
      const elapsed = Math.floor((now - startRef.current) / 1000);

      if (currentPlayer === "R") {
        setTimeR(elapsed);
        if (elapsed >= TEMPO_LIMITE) {
          cancelAnimationFrame(requestRef.current);
          onTimeout();
          return;
        }
      } else {
        setTimeY(elapsed);
        if (elapsed >= TEMPO_LIMITE) {
          cancelAnimationFrame(requestRef.current);
          onTimeout();
          return;
        }
      }
    }

    requestRef.current = requestAnimationFrame(updateTime_);
  }, [currentPlayer, onTimeout]);

  useEffect(() => {
    startRef.current = Date.now();
    requestRef.current = requestAnimationFrame(updateTime_);

    return () => cancelAnimationFrame(requestRef.current);
  }, [currentPlayer, resetSignal]);

  useEffect(() => {
    setTimeR(0);
    setTimeY(0);
  }, [stopSignal]);
  // Lógica condicional para renderizar os timers
  let timerContent;
  if (color === 1) {
    timerContent = (
      <>
        <div
          className={`flex items-center p-3 rounded-lg ${
            currentPlayer === "R" ? "bg-red-600" : "bg-red-950"
          }`}
        >
          {name1}: {timeR}s
        </div>
        <div
          className={`flex items-center p-3 rounded-lg ${
            currentPlayer === "Y"
              ? "bg-yellow-400 text-black"
              : "bg-yellow-800 text-black"
          }`}
        >
          {name2}: {timeY}s
        </div>
      </>
    );
  } else {
    timerContent = (
      <>
        <div
          className={`flex items-center p-3 rounded-lg ${
            currentPlayer === "R" ? "bg-green-500" : "bg-green-950"
          }`}
        >
          {name1}: {timeR}s
        </div>
        <div
          className={`flex items-center p-3 rounded-lg ${
            currentPlayer === "Y"
              ? "bg-gray-100 text-black"
              : "bg-gray-800 text-black"
          }`}
        >
          {name2}: {timeY}s
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-center space-x-10 items-center w-full text-white my-1">
      {timerContent}
    </div>
  );
}

export default Timers;
