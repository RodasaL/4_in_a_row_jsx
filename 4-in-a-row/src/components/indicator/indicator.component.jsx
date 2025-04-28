function Indicator({ hoverCol, numCols }) {
  return (
    <div
      className="absolute z-30 pointer-events-none grid"
      style={{
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        left: "7.2%",
        top: "0.5%",
        width: "86%",
        height: "6%",
      }}
    >
      {Array(numCols)
        .fill(0)
        .map((_, col) => (
          <div key={col} className="flex justify-center items-center">
            {hoverCol === col && (
              <span className="text-3xl text-white animate-bounce">⬇️</span>
            )}
          </div>
        ))}
    </div>
  );
}

export default Indicator;
