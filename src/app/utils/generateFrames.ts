import { Frame } from "../types";
import { v4 as uuidV4 } from "uuid";

export const generateFrames = (): Frame[] => {
  const frames = [];
  for (let i = 0; i < 10; i++) {
    frames.push({
      id: uuidV4(),
      spare: false,
      strike: false,
      totalScore: 0,
    });
  }
  return frames;
};
