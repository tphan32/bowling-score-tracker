import { Frame } from "../types";

const areAllDown = (frame: Frame, key: "strike" | "spare") => {
  return frame[key];
};

export const calculateScore = (frames: Frame[]) => {
  const copyFrames = [...frames];

  // const rolls = copyFrames.map((frame) => {
  //   if (areAllDown(frame, "spare")) {
  //     return 1;
  //   } else if (areAllDown(frame, "strike")) {
  //     return 2;
  //   }
  //   return 0;
  // });

  // console.log(rolls);

  let extraRolls = 0;

  for (let i = 0; i < copyFrames.length; i++) {
    const curFrame = copyFrames[i];
    const firstAttemptScore = curFrame.firstAttempt ?? 0;
    const secondAttemptScore = curFrame.secondAttempt ?? 0;
    const curFrameScore = firstAttemptScore + secondAttemptScore;
    curFrame.totalScore = curFrameScore;

    // if(i > 0 && rolls[i-1]) {

    // }

    // console.log("before extraRolls", i + 1, extraRolls);

    if (extraRolls === 1) {
      copyFrames[i - 1].totalScore! += curFrame.firstAttempt!;
      extraRolls -= 1;
    } else if (extraRolls === 2) {
      copyFrames[i - 1].totalScore! += curFrameScore;
      if (areAllDown(curFrame, "strike")) {
        extraRolls -= 1;
      } else {
        extraRolls -= 2;
      }
    } else if (extraRolls === 3) {
      copyFrames[i - 1].totalScore! += curFrame.firstAttempt!;
      copyFrames[i - 2].totalScore! += curFrame.firstAttempt!;

      if (areAllDown(curFrame, "strike")) {
        if (i === 9) {
          copyFrames[i - 1].totalScore! += curFrame.firstAttempt!;
        }
        extraRolls -= 2;
      } else {
        if (areAllDown(copyFrames[i - 1], "strike")) {
          copyFrames[i - 1].totalScore! += curFrame.secondAttempt!;
        }
        extraRolls -= 3;
      }
    }

    // console.log("after extraRolls", i + 1, extraRolls);

    if (areAllDown(curFrame, "strike")) {
      extraRolls += 2;
    } else if (areAllDown(curFrame, "spare")) {
      extraRolls += 1;
    }

    if (i === 9 && extraRolls) {
      extraRolls = 0;
      curFrame.totalScore += curFrame.thirdAttempt ?? 0;
    }
  }

  return copyFrames.reduce((total, frame) => {
    console.log(JSON.stringify(frame), total, total + frame.totalScore!);
    return total + frame.totalScore!;
  }, 0);
};
