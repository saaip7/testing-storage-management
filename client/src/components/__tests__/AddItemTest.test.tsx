import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddItemSheet } from "../AddItemSheet";

describe("AddItemSheet", () => {
  const onOpenChange = jest.fn();
  const onSubmit = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders input fields and buttons", () => {
    render(
      <AddItemSheet
        open={true}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    );
    expect(screen.getByLabelText(/item name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add item/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(
      <AddItemSheet
        open={true}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));
    expect(
      await screen.findByText(/item name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/quantity is required/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with correct values", async () => {
    render(
      <AddItemSheet
        open={true}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    );
    fireEvent.change(screen.getByLabelText(/item name/i), {
      target: { value: "Test Item" },
    });
    fireEvent.change(screen.getByLabelText(/quantity/i), {
      target: { value: "5" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith("Test Item", 5);
    });
  });

  it("shows validation error if name exceeds 100 characters", async () => {
    render(
      <AddItemSheet
        open={true}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    );
    const longName = "a".repeat(101);
    fireEvent.change(screen.getByLabelText(/item name/i), {
      target: { value: longName },
    });
    fireEvent.change(screen.getByLabelText(/quantity/i), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));
    expect(
      await screen.findByText(/maximum 100 characters/i)
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error if quantity is negative", async () => {
    render(
      <AddItemSheet
        open={true}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    );

    // Set valid name
    fireEvent.change(screen.getByLabelText(/item name/i), {
      target: { value: "Valid Name" },
    });

    // Get the quantity input
    const quantityInput = screen.getByLabelText(/quantity/i);

    // Remove the HTML5 validation attributes that might interfere
    quantityInput.removeAttribute("min");
    quantityInput.removeAttribute("step");

    // Set negative quantity
    fireEvent.change(quantityInput, { target: { value: "-5" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));

    // Look for any error message containing relevant text
    const errorElement = await screen.findByText(
      /quantity must be a positive integer/i
    );
    expect(errorElement).toBeInTheDocument();

    // Check that onSubmit was not called
    expect(onSubmit).not.toHaveBeenCalled();
  });

});
