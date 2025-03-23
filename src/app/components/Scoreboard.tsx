import { ChangeEvent, useState } from "react";
import { Attempt, Player, ScoreData } from "../types";
import Frame from "./Frame";
import { calculateScore } from "../utils/calculateScore";
import Announcement from "./Announcement";
import { findWinner } from "../utils/findWinner";
import { LAST_FRAME_IDX, MAX_SCORE } from "../constants";

interface ScoreboardProps {
  players: Player[];
  onUpdateScore: (scoreData: ScoreData) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, onUpdateScore }) => {
  const [curFrameIdx, setCurFrameIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const winners = curFrameIdx > LAST_FRAME_IDX ? findWinner(players) : [];

  const handleUpdateScore = (
    e: ChangeEvent<HTMLInputElement>,
    metaData: Omit<ScoreData, "score">
  ) => {
    const score = e.target.value.toUpperCase();
    const attempt = metaData.attempt;

    if (score !== "/" && score !== "X" && (score < "0" || score > "9")) {
      if (score.length >= 1) {
        setError(
          "*Invalid input. Accept only numbers from 0 to 9 and characters including X for strikes and / for spares."
        );
      }
      e.target.value = "";
      return;
    } else if (score === "/" && attempt === Attempt.FIRST_ATTEMPT) {
      setError("*Invalid input. Spare can only be on the second attempt.");
      e.target.value = "";
      return;
    } else {
      const curFrame = players.find(
        (player) => player.id === metaData.playerId
      )!.frames[metaData.frameIdx];
      const curFrameScore = curFrame.firstAttempt! + +score;
      if (
        curFrameIdx < LAST_FRAME_IDX &&
        attempt === Attempt.SECOND_ATTEMPT &&
        curFrameScore > MAX_SCORE
      ) {
        setError("*Invalid input. Total score for the frame exceeds 10.");
        e.target.value = "";
        return;
      } else if (curFrameScore === MAX_SCORE) {
        e.target.value = "/";
      }
    }

    setError(null);
    onUpdateScore({
      score,
      frameIdx: metaData.frameIdx,
      playerId: metaData.playerId,
      attempt,
    });
  };

  if (curFrameIdx <= LAST_FRAME_IDX) {
    const shouldGoToNextFrame = players.every((player) => {
      const curFrame = player.frames[curFrameIdx];
      if (
        curFrameIdx === LAST_FRAME_IDX &&
        (curFrame.spare || curFrame.strike)
      ) {
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
  }

  return (
    <div className="flex flex-col gap-3">
      <Announcement winners={winners} players={players} />
      {error && <div className="text-red-500 text-sm">{error}</div>}
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
