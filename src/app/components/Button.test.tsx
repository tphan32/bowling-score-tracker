import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Button", () => {
  const label = "Click Me";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the button with the correct label", () => {
    render(<Button label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("should call the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label={label} onClick={handleClick} />);
    fireEvent.click(screen.getByText(label));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should disable when passing the disabled prop as true", () => {
    render(<Button label={label} disabled />);
    expect(screen.getByText(label)).toBeDisabled();
  });

  it("should not able to call the onClick handler when passing the disabled prop as true", () => {
    const handleClick = jest.fn();
    render(<Button label={label} disabled onClick={handleClick} />);
    fireEvent.click(screen.getByText(label));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it("should have the correct type attribute", () => {
    render(<Button label={label} type="submit" />);
    expect(screen.getByText(label)).toHaveAttribute("type", "submit");
  });

  it("should apply the correct default type when no type is provided", () => {
    render(<Button label={label} />);
    expect(screen.getByText(label)).toHaveAttribute("type", "button");
  });
});
