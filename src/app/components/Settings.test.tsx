import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Settings from "./Settings";
import {
  hulkPlayer,
  multiPlayersArr,
  singlePlayerArr,
} from "../fixtures/testPlayers";

describe("Settings", () => {
  const mockOnStart = jest.fn();
  const mockOnAddPlayer = jest.fn();
  const mockOnReset = jest.fn();

  it("should render the setup form with single player", () => {
    render(
      <Settings
        players={singlePlayerArr}
        onStart={mockOnStart}
        onAddPlayer={mockOnAddPlayer}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText("Setup")).toBeInTheDocument();
    expect(
      screen.getByText("*Only up to 5 players allowed")
    ).toBeInTheDocument();
    singlePlayerArr.forEach((_, index) => {
      expect(
        screen.getByLabelText(`Name of player ${index + 1}:`)
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Add more player")).toBeInTheDocument();
    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("should call onStart when the form is submitted", () => {
    render(
      <Settings
        players={singlePlayerArr}
        onStart={mockOnStart}
        onAddPlayer={mockOnAddPlayer}
        onReset={mockOnReset}
      />
    );

    fireEvent.submit(screen.getByRole("form"));
    expect(mockOnStart).toHaveBeenCalled();
  });

  it("should call onAddPlayer and add one more name input field when 'Add more player' button is clicked", () => {
    render(
      <Settings
        players={singlePlayerArr}
        onStart={mockOnStart}
        onAddPlayer={mockOnAddPlayer}
        onReset={mockOnReset}
      />
    );
    expect(screen.getByLabelText("Name of player 1:")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Add more player"));
    expect(mockOnAddPlayer).toHaveBeenCalled();
    waitFor(() => {
      expect(screen.getByLabelText("Name of player 2:")).toBeInTheDocument();
    });
  });

  it("should call onReset and remove all name input fields when 'Reset' button is clicked", () => {
    render(
      <Settings
        players={multiPlayersArr}
        onStart={mockOnStart}
        onAddPlayer={mockOnAddPlayer}
        onReset={mockOnReset}
      />
    );

    multiPlayersArr.forEach((_, index) => {
      expect(
        screen.getByLabelText(`Name of player ${index + 1}:`)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Reset"));
    expect(mockOnReset).toHaveBeenCalled();
    waitFor(() => {
      multiPlayersArr.forEach((_, index) => {
        expect(
          screen.queryByLabelText(`Name of player ${index + 1}:`)
        ).not.toBeInTheDocument();
      });
    });
  });

  it("should disable inputs and buttons when disabled prop is true", () => {
    render(
      <Settings
        players={singlePlayerArr}
        onStart={mockOnStart}
        onAddPlayer={mockOnAddPlayer}
        onReset={mockOnReset}
        disabled={true}
      />
    );
    expect(screen.getByText("Add more player")).toBeDisabled();
    expect(screen.getByText("Start")).toBeDisabled();
  });

  it("disables 'Add more player' button when there are 5 players", () => {
    render(
      <Settings
        players={[...multiPlayersArr, { ...hulkPlayer, id: "Hulk2" }]}
        onStart={mockOnStart}
        onAddPlayer={mockOnAddPlayer}
        onReset={mockOnReset}
      />
    );

    expect(screen.getByText("Add more player")).toBeDisabled();
  });
});
