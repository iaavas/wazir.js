import { Color, PieceSymbol, Square, Chess } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

function ChessBoard({
  board,
  socket,
  chess,
  setBoard,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  chess: Chess;
  setBoard: React.Dispatch<React.SetStateAction<typeof board>>;
  socket: WebSocket;
}) {
  const [from, setFrom] = useState<null | Square>(null);
  // const [to, setTo] = useState<null | Square>(null);

  return (
    <div className="text-black">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;

              return (
                <div
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 == 0 ? "bg-[#779556]" : "bg-[#EBECD0]"
                  }`}
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );

                      setFrom(null);
                      chess.move({
                        from,
                        to: squareRepresentation,
                      });
                      setBoard(chess.board());
                    }
                  }}
                >
                  <div className="w-full flex justify-center h-full">
                    <div className="h-full flex justify-center flex-col ">
                      {square ? (
                        <img
                          src={`/${
                            square.color
                          }${square.type.toLowerCase()}.png`}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
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
