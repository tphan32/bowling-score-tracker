import { Frame } from "../types";

export const generateFrames = (): Frame[] => {
  const frames = [];
  for (let i = 0; i < 10; i++) {
    frames.push({
      id: i,
      spare: false,
      strike: false,
      totalScore: 0,
    });
  }
  return frames;
};
