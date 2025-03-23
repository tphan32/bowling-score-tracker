import {
  deadpoolFrames,
  framesManyOpenAndSpares,
  framesManyOpenAndSpares2,
  framesManyOpenAndSpares3,
  framesManyOpenAndStrikes,
  framesManyOpenAndStrikes2,
  framesOnlineExample,
  framesOnlineExample2,
  framesOnlySpares,
  framesOpenAndSpares,
  framesOpenAndStrikes,
  framesWithHighScores,
  framesWithLowScores,
  framesWithMaxScore,
  framesWithMinScore,
  framesWithNoSparesAndStrikes,
  framesWithSparesAndStrikes,
  hawkeyeFrames,
  hulkFrames,
  incompleteFrame,
  incompleteFrameWithSpare,
  incompleteFrameWithStrike,
  twoFramesWithSpare,
  twoFramesWithStrike,
  wolverineFrames,
} from "../fixtures/testFrames";
import { calculateScore } from "./calculateScore";

describe("calculateScore", () => {
  it("should return correct score when frames do have any strikes or spares", () => {
    expect(calculateScore(framesWithNoSparesAndStrikes)).toBe(46);
  });

  it("should return correct score when frames have random strikes and spares (hulk's frames)", () => {
    expect(calculateScore(hulkFrames)).toBe(168);
  });

  it("should return correct score when frames have random strikes and spares (hawkeye's frames)", () => {
    expect(calculateScore(hawkeyeFrames)).toBe(170);
  });

  it("should return correct score when frames have random strikes and spares (wolverine's frames)", () => {
    expect(calculateScore(wolverineFrames)).toBe(160);
  });

  it("should return correct score when frames have random strikes and spares (deadpool's frames)", () => {
    expect(calculateScore(deadpoolFrames)).toBe(151);
  });

  it("should return correct score when frames do have only strikes and spares", () => {
    expect(calculateScore(framesWithSparesAndStrikes)).toBe(230);
  });

  it("should return the minimum score when frames are 0s", () => {
    expect(calculateScore(framesWithMinScore)).toBe(0);
  });

  it("should return the maximum score when frames are all strikes", () => {
    expect(calculateScore(framesWithMaxScore)).toBe(300);
  });

  it("should return half of maximum score when frames are all spares", () => {
    expect(calculateScore(framesOnlySpares)).toBe(150);
  });

  it("should return correct score when frame are open and spares", () => {
    expect(calculateScore(framesOpenAndSpares)).toBe(83);
  });

  it("should return correct score when frame are open and strikes", () => {
    expect(calculateScore(framesOpenAndStrikes)).toBe(145);
  });

  it("should return correct score when frame are open and strikes", () => {
    expect(calculateScore(framesManyOpenAndStrikes)).toBe(150);
  });

  it("should return correct score when frame are open and strikes 2", () => {
    expect(calculateScore(framesManyOpenAndStrikes2)).toBe(195);
  });

  it("should return correct score when frame are open and spares", () => {
    expect(calculateScore(framesManyOpenAndSpares)).toBe(99);
  });

  it("should return correct score when frame are open and spares 2", () => {
    expect(calculateScore(framesManyOpenAndSpares2)).toBe(119);
  });

  it("should return correct score when frame are open and spares 3", () => {
    expect(calculateScore(framesManyOpenAndSpares3)).toBe(116);
  });

  it("should pass when comparing lower frames score with high frames score", () => {
    expect(calculateScore(framesWithLowScores)).toBeLessThan(
      calculateScore(framesWithHighScores)
    );
  });

  it("should return correct score when passing online example", () => {
    expect(calculateScore(framesOnlineExample)).toBe(82);
  });

  it("should return correct score when passing online example 2", () => {
    expect(calculateScore(framesOnlineExample2)).toBe(163);
  });

  it("should return correct score when passing incomplete frame with one spare and one strike and one open", () => {
    expect(calculateScore(incompleteFrame)).toBe(46);
  });

  it("should return correct score when passing incomplete frame with one spare and one open", () => {
    expect(calculateScore(incompleteFrameWithSpare)).toBe(12);
  });

  it("should return correct score when passing two frames with one spare and one open", () => {
    expect(calculateScore(twoFramesWithSpare)).toBe(13);
  });

  it("should return correct score when passing incomplete frame with one strike and one open", () => {
    expect(calculateScore(incompleteFrameWithStrike)).toBe(12);
  });

  it("should return correct score when passing two frames with one strike and one open", () => {
    expect(calculateScore(twoFramesWithStrike)).toBe(14);
  });
});
