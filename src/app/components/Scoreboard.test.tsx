import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Scoreboard from "./Scoreboard";
import { Attempt } from "../types";
import { SPARE, STRIKE } from "../constants";
import {
  hulkPlayer,
  multiPlayersArr,
  singlePlayerArr,
} from "../fixtures/testPlayers";

describe("Scoreboard", () => {
  const mockOnUpdateScore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the scoreboard with a single player", () => {
    render(
      <Scoreboard players={singlePlayerArr} onUpdateScore={mockOnUpdateScore} />
    );

    singlePlayerArr.forEach((player) => {
      expect(screen.getByText(player.name!)).toBeInTheDocument();
    });
  });

  it("should render the scoreboard with multi players", () => {
    render(
      <Scoreboard players={multiPlayersArr} onUpdateScore={mockOnUpdateScore} />
    );

    multiPlayersArr.forEach((player) => {
      expect(screen.getByText(player.name!)).toBeInTheDocument();
    });
  });

  it("should display an error when encountering invalid input", () => {
    render(
      <Scoreboard players={singlePlayerArr} onUpdateScore={mockOnUpdateScore} />
    );

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: "A" },
    });

    expect(
      screen.getByText(
        "*Invalid input. Accept only numbers from 0 to 9 and characters including X for strikes and / for spares."
      )
    ).toBeInTheDocument();
  });

  it("should handle a valid strike input", () => {
    render(
      <Scoreboard players={singlePlayerArr} onUpdateScore={mockOnUpdateScore} />
    );

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: STRIKE },
    });

    expect(mockOnUpdateScore).toHaveBeenCalledWith({
      score: STRIKE,
      frameIdx: 0,
      playerId: hulkPlayer.id,
      attempt: Attempt.FIRST_ATTEMPT,
    });
  });

  it("should handle a valid spare input on the second attempt", () => {
    render(
      <Scoreboard players={singlePlayerArr} onUpdateScore={mockOnUpdateScore} />
    );

    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: { value: SPARE },
    });

    expect(mockOnUpdateScore).toHaveBeenCalledWith({
      score: SPARE,
      frameIdx: 0,
      playerId: hulkPlayer.id,
      attempt: Attempt.SECOND_ATTEMPT,
    });
  });

  it("should display an error when spare is entered on the first attempt", () => {
    render(
      <Scoreboard players={singlePlayerArr} onUpdateScore={mockOnUpdateScore} />
    );

    fireEvent.change(screen.getAllByRole("textbox")[0], {
      target: { value: SPARE },
    });

    expect(
      screen.getByText(
        "*Invalid input. Spare can only be on the second attempt."
      )
    ).toBeInTheDocument();
  });

  it("should display an error if total frame score exceeds 10", () => {
    const updatedPlayers = [...singlePlayerArr];
    updatedPlayers[0].frames[0].firstAttempt = 8;

    render(
      <Scoreboard players={updatedPlayers} onUpdateScore={mockOnUpdateScore} />
    );

    fireEvent.change(screen.getAllByRole("textbox")[1], {
      target: { value: "5" },
    });

    expect(
      screen.getByText("*Invalid input. Total score for the frame exceeds 10.")
    ).toBeInTheDocument();
  });

  it("should convert to / when firstAttempt is 5 and secondAttempt is 5", () => {
    const updatedPlayers = [...singlePlayerArr];
    updatedPlayers[0].frames[0].firstAttempt = 5;

    render(
      <Scoreboard players={updatedPlayers} onUpdateScore={mockOnUpdateScore} />
    );

    const secondInput = screen.getAllByRole("textbox")[1];

    fireEvent.change(secondInput, {
      target: { value: "5" },
    });
    waitFor(() => {
      expect(secondInput.innerText).toBe(SPARE);
    });
  });

  it("should display name of the winner when game is over", () => {
    render(
      <Scoreboard players={singlePlayerArr} onUpdateScore={mockOnUpdateScore} />
    );
    expect(screen.getByText(`${hulkPlayer.name} wins!`)).toBeInTheDocument();
  });
});
