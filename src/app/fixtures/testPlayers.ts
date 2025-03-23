import { Player } from "../types";
import {
  completeDeadpoolFrames,
  completeHawkeyeFrames,
  completeHulkFrames,
  completeWolverineFrames,
} from "./testFrames";

export const hulkPlayer = {
  id: "Hulk",
  name: "Hulk",
  frames: completeHulkFrames,
};
export const hawkeyePlayer = {
  id: "HawkEye",
  name: "HawkEye",
  frames: completeHawkeyeFrames,
};
export const wolverinePlayer = {
  id: "Wolverine",
  name: "Wolverine",
  frames: completeWolverineFrames,
};
export const deadpoolPlayer = {
  id: "Deadpool",
  name: "Deadpool",
  frames: completeDeadpoolFrames,
};

export const singlePlayerArr: Player[] = [hulkPlayer];

export const multiPlayersArr: Player[] = [
  deadpoolPlayer,
  hulkPlayer,
  hawkeyePlayer,
  wolverinePlayer,
];

export const tiePlayersArr: Player[] = [hulkPlayer, hulkPlayer, hulkPlayer];
