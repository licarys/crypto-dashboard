import { render, screen } from "@testing-library/react";
import { NoResults } from "../NoResults";

describe("NoResults", () => {
  it("renders with default message", () => {
    render(<NoResults />);
    expect(screen.getByText("No cryptocurrencies found matching your search.")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    const customMessage = "Custom no results message";
    render(<NoResults message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("renders the search icon", () => {
    render(<NoResults />);
    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-12", "h-12");
  });
}); 