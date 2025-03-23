import { Frame } from "../types";

export const calculateScore = (frames: Frame[]): number => {
  let score = 0;
  let rollIndex = 0;

  const scores = frames.reduce((acc, frame) => {
    if (frame.strike) {
      acc.push(10);
    } else {
      acc.push(frame.firstAttempt ?? 0);
      acc.push(frame.secondAttempt ?? 0);
    }
    return acc;
  }, [] as number[]);

  for (let frame = 0; frame < 10; frame++) {
    if (rollIndex >= scores.length) {
      break;
    }
    if (scores[rollIndex] === 10) {
      if (rollIndex + 2 >= scores.length) {
        break;
      }
      score += 10 + scores[rollIndex + 1] + scores[rollIndex + 2];
      rollIndex++;
    } else {
      if (rollIndex + 1 >= scores.length) {
        break;
      }
      const frameSum = scores[rollIndex] + scores[rollIndex + 1];
      if (frameSum === 10) {
        if (rollIndex + 2 >= scores.length) {
          break;
        }
        score += scores[rollIndex + 2];
      }
      score += frameSum;
      rollIndex += 2;
    }
  }
  return score;
};
