import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Frame from "./Frame";
import { Attempt } from "../types";
import { LAST_FRAME_IDX } from "../constants";
import { hulkPlayer } from "../fixtures/testPlayers";

describe("Frame", () => {
  const mockOnUpdateScore = jest.fn();

  const defaultProps = {
    frameIdx: 0,
    playerId: hulkPlayer.id,
    frame: hulkPlayer.frames[0],
    highlighted: true,
    onUpdateScore: mockOnUpdateScore,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the frame index correctly", () => {
    render(<Frame {...defaultProps} />);
    expect(screen.getByText(defaultProps.frameIdx + 1)).toBeInTheDocument();
  });

  it("should disable the first input when not highlighted", () => {
    render(<Frame {...defaultProps} highlighted={false} />);
    expect(screen.getAllByRole("textbox")[0]).toBeDisabled();
  });

  it("should call onUpdateScore when the first input changes", () => {
    render(<Frame {...defaultProps} />);
    const firstInput = screen.getAllByRole("textbox")[0];
    fireEvent.change(firstInput, { target: { value: "5" } });
    expect(mockOnUpdateScore).toHaveBeenCalledWith(expect.anything(), {
      frameIdx: defaultProps.frameIdx,
      playerId: defaultProps.playerId,
      attempt: Attempt.FIRST_ATTEMPT,
    });
  });

  it("should call onUpdateScore when the second input changes", () => {
    render(
      <Frame
        {...defaultProps}
        frame={{
          ...defaultProps.frame,
          firstAttempt: 4,
          secondAttempt: undefined,
          strike: false,
          spare: false,
        }}
      />
    );
    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: { value: "5" },
    });
    expect(mockOnUpdateScore).toHaveBeenCalledWith(expect.anything(), {
      frameIdx: defaultProps.frameIdx,
      playerId: defaultProps.playerId,
      attempt: Attempt.SECOND_ATTEMPT,
    });
  });

  it("should call onUpdateScore when the second input changes", () => {
    render(
      <Frame
        {...defaultProps}
        frameIdx={LAST_FRAME_IDX}
        frame={{
          ...defaultProps.frame,
          thirdAttempt: undefined,
          strike: true,
          spare: false,
        }}
      />
    );
    fireEvent.change(screen.getAllByRole("textbox")[2], {
      target: { value: "5" },
    });
    expect(mockOnUpdateScore).toHaveBeenCalledWith(expect.anything(), {
      frameIdx: LAST_FRAME_IDX,
      playerId: defaultProps.playerId,
      attempt: Attempt.THIRD_ATTEMPT,
    });
  });

  it("should disable the second input when the first attempt is undefined", () => {
    render(<Frame {...defaultProps} />);
    expect(screen.getAllByRole("textbox")[1]).toBeDisabled();
  });

  it("should enable the second input when the first attempt is defined", () => {
    render(
      <Frame
        {...defaultProps}
        frame={{
          ...defaultProps.frame,
          secondAttempt: undefined,
          strike: false,
          spare: false,
        }}
      />
    );
    expect(screen.getAllByRole("textbox")[1]).not.toBeDisabled();
  });

  it("should render the third input only for the last frame", () => {
    render(<Frame {...defaultProps} frameIdx={LAST_FRAME_IDX} />);
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
  });

  it("should disable the third input when not a strike or spare in the last frame", () => {
    render(
      <Frame
        {...defaultProps}
        frameIdx={LAST_FRAME_IDX}
        frame={{ ...defaultProps.frame, strike: false, spare: false }}
      />
    );
    expect(screen.getAllByRole("textbox")[2]).toBeDisabled();
  });

  it("should enable the third input for a strike or spare in the last frame", () => {
    render(
      <Frame
        {...defaultProps}
        frameIdx={LAST_FRAME_IDX}
        frame={{ ...defaultProps.frame, strike: true }}
      />
    );
    expect(screen.getAllByRole("textbox")[2]).not.toBeDisabled();
  });

  it("should display the total score when both attempts are defined", () => {
    render(
      <Frame
        {...defaultProps}
        frame={{
          ...defaultProps.frame,
          firstAttempt: 5,
          secondAttempt: 4,
          totalScore: 9,
        }}
      />
    );
    expect(screen.getByText("9")).toBeInTheDocument();
  });
});
