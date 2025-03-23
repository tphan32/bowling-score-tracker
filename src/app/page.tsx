"use client";

import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Attempt, Player, ScoreData } from "./types";
import Settings from "./components/Settings";
import PageTitle from "./components/PageTitle";
import Scoreboard from "./components/Scoreboard";
import { generateFrames } from "./utils/generateFrames";

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
          if (score === "X") {
            updatedFrames[frameIdx].strike = true;
            updatedFrames[frameIdx][attempt] = 10;
            if (frameIdx < 9) {
              updatedFrames[frameIdx][Attempt.SECOND_ATTEMPT] = 0;
            }
          } else if (score === "/") {
            updatedFrames[frameIdx].spare = true;
            updatedFrames[frameIdx][attempt] =
              10 - updatedFrames[frameIdx].firstAttempt!;
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
    if (players.length >= 5) {
      return;
    }

    setPlayers((prevPlayers) => {
      return [...prevPlayers, { id: uuidV4(), frames: generateFrames() }];
    });
  };

  const handleRest = () => {
    setPlayers([{ id: uuidV4(), frames: generateFrames() }]);
    setIsStarted(false);
  };

  return (
    <>
      <PageTitle />
      <Settings
        onStart={handleStartGame}
        onAddPlayer={handleAddPlayer}
        onReset={handleRest}
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

