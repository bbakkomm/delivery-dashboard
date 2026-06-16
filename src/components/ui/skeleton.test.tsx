import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton, SkeletonGroup } from "./skeleton";

describe("Skeleton", () => {
  it("renders as presentation-only loading surface", () => {
    render(<Skeleton data-testid="metric-loading" variant="metric" />);

    const skeleton = screen.getByTestId("metric-loading");

    expect(skeleton).toHaveClass("skeleton", "skeleton-metric");
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  it("groups async placeholders with a status region", () => {
    render(
      <SkeletonGroup>
        <Skeleton variant="line" />
        <Skeleton variant="card" />
      </SkeletonGroup>,
    );

    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });
});
