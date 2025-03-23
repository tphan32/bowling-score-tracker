import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PageTitle from "./PageTitle";

describe("PageTitle", () => {
  it("should render the component correctly", () => {
    render(<PageTitle />);
    expect(
      screen.getByRole("heading", {
        name: /welcome to bowling score tracker/i,
      })
    ).toBeInTheDocument();
  });

  it("should apply the correct styles to the heading", () => {
    render(<PageTitle />);

    expect(
      screen.getByRole("heading", {
        name: /welcome to bowling score tracker/i,
      })
    ).toHaveClass("text-center text-4xl font-semibold text-gray-900");
  });
});
