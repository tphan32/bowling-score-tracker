import { ChangeEvent, useEffect, useState } from "react";
import { Player, ScoreData } from "../types";
import Frame from "./Frame";
import { calculateScore } from "../utils/calculateScore";
import Announcement from "./Announcement";
import { findWinner } from "../utils/findWinner";

interface ScoreboardProps {
  players: Player[];
  onUpdateScore: (scoreData: ScoreData) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, onUpdateScore }) => {
  const [curFrameIdx, setCurFrameIdx] = useState(0);
  const winners = curFrameIdx === 10 ? findWinner(players) : [];

  const handleUpdateScore = (
    e: ChangeEvent<HTMLInputElement>,
    metaData: Omit<ScoreData, "score">
  ) => {
    const score = e.target.value.toUpperCase();
    if (score !== "/" && score !== "X" && (score < "0" || score > "9")) {
      e.target.value = "";
      return;
    }

    onUpdateScore({
      score,
      frameIdx: metaData.frameIdx,
      playerId: metaData.playerId,
      attempt: metaData.attempt,
    });
  };

  useEffect(() => {
    const shouldGoToNextFrame = players.every((player) => {
      const curFrame = player.frames[curFrameIdx];
      if (curFrameIdx === 9 && (curFrame.spare || curFrame.strike)) {
        return curFrame.thirdAttempt !== undefined;
      }
      return (
        curFrame.firstAttempt !== undefined &&
        curFrame.secondAttempt !== undefined
      );
    });

    if (shouldGoToNextFrame) {
      setCurFrameIdx((prevFrame) => prevFrame + 1);
    }
  }, [players]);

  return (
    <div className="flex flex-col gap-3">
      <Announcement winners={winners} players={players} />
      {players.map((player) => {
        const isWinner = winners.includes(player.id);

        return (
          <div key={player.id}>
            <div className="text-sm">
              <span className="text-gray-700 font-bold text-lg">
                {player.name}
              </span>
            </div>
            <div
              className={`flex border border-solid border-black rounded-md ${
                isWinner && "bg-green-100"
              }`}
            >
              {player.frames.map((frame, index) => {
                return (
                  <Frame
                    key={frame.id}
                    frameIdx={index}
                    playerId={player.id}
                    frame={frame}
                    highlighted={curFrameIdx === index}
                    onUpdateScore={handleUpdateScore}
                  />
                );
              })}
              <div className="flex flex-col h-20 text-center flex-1">
                <div className="border-b-1">Final scores</div>
                <div className="flex h-full	items-center justify-center text-xl">
                  {calculateScore(player.frames)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Scoreboard;
