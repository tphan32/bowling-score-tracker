import { generateFrames } from "./generateFrames";

describe("generateFrames", () => {
  it("should generate an array of 10 frames", () => {
    const frames = generateFrames();
    expect(frames).toHaveLength(10);
  });

  it("should generate frames with unique IDs", () => {
    const frames = generateFrames();
    const ids = frames.map((frame) => frame.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(10);
  });

  it("should generate frames with default properties", () => {
    const frames = generateFrames();
    frames.forEach((frame) => {
      expect(frame.spare).toBe(false);
      expect(frame.strike).toBe(false);
      expect(frame.totalScore).toBe(0);
    });
  });

  it("should return an array of objects conforming to the Frame type", () => {
    const frames = generateFrames();
    frames.forEach((frame) => {
      expect(frame).toHaveProperty("id");
      expect(frame).toHaveProperty("spare");
      expect(frame).toHaveProperty("strike");
      expect(frame).toHaveProperty("totalScore");
    });
  });
});
