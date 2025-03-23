"use client";

import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Attempt, Player, ScoreData } from "./types";
import Settings from "./components/Settings";
import PageTitle from "./components/PageTitle";
import Scoreboard from "./components/Scoreboard";
import { generateFrames } from "./utils/generateFrames";
import {
  LAST_FRAME_IDX,
  MAX_PLAYERS,
  MAX_SCORE,
  MIN_SCORE,
  SPARE,
  STRIKE,
} from "./constants";

const Home: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: uuidV4(), frames: generateFrames() },
  ]);
  const [isStarted, setIsStarted] = useState(false);

  const updateFrameScore = (scoreData: ScoreData) => {
    const { score, playerId, frameIdx, attempt } = scoreData;

    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === playerId) {
          const updatedFrames = [...player.frames];
          if (score === STRIKE) {
            updatedFrames[frameIdx].strike = true;
            updatedFrames[frameIdx][attempt] = MAX_SCORE;
            if (frameIdx < LAST_FRAME_IDX) {
              updatedFrames[frameIdx][Attempt.SECOND_ATTEMPT] = MIN_SCORE;
            }
          } else if (score === SPARE) {
            updatedFrames[frameIdx].spare = true;
            if (attempt === Attempt.SECOND_ATTEMPT) {
              updatedFrames[frameIdx][attempt] =
                MAX_SCORE - updatedFrames[frameIdx].firstAttempt!;
            } else if (attempt === Attempt.THIRD_ATTEMPT) {
              updatedFrames[frameIdx][attempt] =
                MAX_SCORE - updatedFrames[frameIdx].secondAttempt!;
            }
          } else {
            updatedFrames[frameIdx][attempt] = +score;
          }
          return { ...player, frames: updatedFrames };
        }
        return player;
      });
    });
  };

  const handleStartGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPlayers = players.map((player, index) => {
      return { ...player, name: e.currentTarget[`name${index + 1}`].value };
    });
    setPlayers(updatedPlayers);
    setIsStarted(true);
  };

  const handleAddPlayer = () => {
    if (players.length >= MAX_PLAYERS) {
      return;
    }

    setPlayers((prevPlayers) => {
      return [...prevPlayers, { id: uuidV4(), frames: generateFrames() }];
    });
  };

  const handleReset = () => {
    setPlayers([{ id: uuidV4(), frames: generateFrames() }]);
    setIsStarted(false);
  };

  return (
    <>
      <PageTitle />
      <Settings
        onStart={handleStartGame}
        onAddPlayer={handleAddPlayer}
        onReset={handleReset}
        disabled={isStarted}
        players={players}
      />
      {isStarted && (
        <Scoreboard players={players} onUpdateScore={updateFrameScore} />
      )}
    </>
  );
};

export default Home;

