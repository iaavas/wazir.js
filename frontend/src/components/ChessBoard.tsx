import { Color, PieceSymbol, Square } from "chess.js";

function ChessBoard({
  board,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}) {
  return (
    <div className="text-white">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              return (
                <div
                  key={j}
                  className={`w-8 h-8 ${
                    square ? "bg-green-500" : "bg-green-300"
                  }`}
                >
                  {square ? square.type : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ChessBoard;
