import { findWinner, getPlayerById } from "./findWinner";
import {
  hawkeyePlayer,
  hulkPlayer,
  multiPlayersArr,
  singlePlayerArr,
  tiePlayersArr,
} from "../fixtures/testPlayers";

describe("findWinner", () => {
  it("should return an empty array when no players are provided", () => {
    expect(findWinner([])).toEqual([]);
  });

  it("should return the ID of the player with the highest score when a single player is provided", () => {
    expect(findWinner(singlePlayerArr)[0]).toEqual(hulkPlayer.id);
  });

  it("should return the ID of the player with the highest score when multiple players are provided", () => {
    expect(findWinner(multiPlayersArr)[0]).toEqual(hawkeyePlayer.id);
  });

  it("should return multiple IDs when there is a tie", () => {
    expect(findWinner(tiePlayersArr)).toEqual([
      hulkPlayer.id,
      hulkPlayer.id,
      hulkPlayer.id,
    ]);
  });
});

describe("getPlayerById", () => {
  it("should return the player when matching id in single player array", () => {
    expect(getPlayerById(singlePlayerArr, hulkPlayer.id)).toEqual(hulkPlayer);
  });

  it("should return the player when matching id in multi players array", () => {
    expect(getPlayerById(multiPlayersArr, hulkPlayer.id)).toEqual(hulkPlayer);
  });

  it("should return undefined when not matching id", () => {
    expect(getPlayerById(multiPlayersArr, "ABC")).toBeUndefined();
  });

  it("should return undefined when no players provided", () => {
    expect(getPlayerById([], "3")).toBeUndefined();
  });
});
