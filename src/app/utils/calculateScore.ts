import { Frame } from "../types";

const areAllDown = (frame: Frame, key: "strike" | "spare") => {
  return frame[key];
};

const createRolls = (frames: Frame[]) => {
  return frames.map((frame) => {
    if (areAllDown(frame, "spare")) {
      return 1;
    } else if (areAllDown(frame, "strike")) {
      return 2;
    }
    return 0;
  });
};

const calculateScoreEachFrame = (rolls: number[], frames: Frame[]) => {
  const copyFrames = [...frames];

  for (let i = 0; i < copyFrames.length; i++) {
    const curFrame = copyFrames[i];
    const firstAttemptScore = curFrame.firstAttempt ?? 0;
    const secondAttemptScore = curFrame.secondAttempt ?? 0;
    const curFrameScore = firstAttemptScore + secondAttemptScore;
    curFrame.totalScore = curFrameScore;
    const twoIdxBehind = i - 2;
    const oneIdxBehind = i - 1;
    const oneFrameBehind = copyFrames[oneIdxBehind];
    const twoFramesBehind = copyFrames[twoIdxBehind];

    if (twoIdxBehind >= 0 && rolls[twoIdxBehind] - 1 >= 0) {
      rolls[twoIdxBehind] -= 1;
      twoFramesBehind.totalScore! += firstAttemptScore;
    }

    if (oneIdxBehind >= 0 && rolls[oneIdxBehind] - 1 >= 0) {
      rolls[oneIdxBehind] -= 1;
      oneFrameBehind.totalScore! += firstAttemptScore;

      if (rolls[oneIdxBehind] - 1 >= 0) {
        if (!areAllDown(curFrame, "strike")) {
          rolls[oneIdxBehind] -= 1;
        }
        oneFrameBehind.totalScore! += secondAttemptScore;
      }
    }

    curFrame.totalScore += curFrame.thirdAttempt ?? 0;
  }
  return copyFrames;
};

export const getFinalScore = (frames: Frame[]) => {
  return frames.reduce((acc, cur) => {
    return acc + (cur.totalScore ?? 0);
  }, 0);
};

export const calculateScore = (frames: Frame[]): number => {
  const copyFrames = [...frames];
  return getFinalScore(
    calculateScoreEachFrame(createRolls(copyFrames), copyFrames)
  );
};
