import { Player } from "../types";
import { getFinalScore } from "./calculateScore";

export const getPlayerById = (
  players: Player[],
  playerId: Player["id"]
): Player => {
  return players.find((player) => player.id === playerId)!;
};

export const findWinner = (players: Player[]): Player["id"][] => {
  const winners: Player["id"][] = [];
  const highestScore = Math.max(
    ...players.map((player) => getFinalScore(player.frames))
  );
  players.forEach((player) => {
    if (getFinalScore(player.frames) === highestScore) {
      winners.push(player.id);
    }
  });
  return winners;
};
