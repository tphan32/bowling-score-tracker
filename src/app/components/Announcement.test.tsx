import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Announcement from "./Announcement";
import { getPlayerById } from "../utils/findWinner";
import {
  hulkPlayer,
  multiPlayersArr,
  singlePlayerArr,
  tiePlayersArr,
} from "../fixtures/testPlayers";

jest.mock("../utils/findWinner", () => ({
  getPlayerById: jest.fn(),
}));

describe("Announcement", () => {
  it("should render nothing when there are no winners", () => {
    render(<Announcement winners={[]} players={singlePlayerArr} />);
    expect(screen.queryByText(/wins!/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/There is a tie!/i)).not.toBeInTheDocument();
  });

  it("should render the winner's name when there is one winner and player", () => {
    (getPlayerById as jest.Mock).mockReturnValue(hulkPlayer);
    render(
      <Announcement winners={[hulkPlayer.id]} players={singlePlayerArr} />
    );
    expect(screen.getByText(`${hulkPlayer.name} wins!`)).toBeInTheDocument();
  });

  it("should render the winner's name when there is one winner among multi players", () => {
    (getPlayerById as jest.Mock).mockReturnValue(hulkPlayer);
    render(
      <Announcement winners={[hulkPlayer.id]} players={multiPlayersArr} />
    );
    expect(screen.getByText(`${hulkPlayer.name} wins!`)).toBeInTheDocument();
  });

  it("renders 'There is a tie!' when there are multiple winners", () => {
    render(
      <Announcement
        winners={[hulkPlayer.id, hulkPlayer.id]}
        players={tiePlayersArr}
      />
    );
    expect(screen.getByText("There is a tie!")).toBeInTheDocument();
  });
});
