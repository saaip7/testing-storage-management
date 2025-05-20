import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ItemTable } from "../ItemTable";
import "@testing-library/jest-dom";

const mockItems = [
  {
    _id: "1",
    name: "Item One",
    quantity: 10,
    createdAt: "2024-05-19T10:00:00.000Z",
    updatedAt: "2024-05-19T11:00:00.000Z",
    __v: 0,
  },
  {
    _id: "2",
    name: "Item Two",
    quantity: 5,
    createdAt: "2024-05-18T12:30:00.000Z",
    updatedAt: "2024-05-18T13:00:00.000Z",
    __v: 0,
  },
];

describe("ItemTable Rendering", () => {
  it("renders the table with correct number of rows for items", () => {
    render(
      <ItemTable
        items={mockItems}
        loading={false}
        onDelete={jest.fn()}
        currentPage={1}
        totalPages={1}
        onPageChange={jest.fn()}
      />
    );
    // Desktop table is hidden on mobile, so look for item names
    screen.getAllByText("Item One").forEach((el) => {
      expect(el).toBeInTheDocument();
    });
    screen.getAllByText("Item Two").forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });

  it("renders the loading skeleton when loading is true", () => {
    render(
      <ItemTable
        items={[]}
        loading={true}
        onDelete={jest.fn()}
        currentPage={1}
        totalPages={1}
        onPageChange={jest.fn()}
      />
    );
    // Skeletons have pulse animation class
    expect(screen.getAllByRole("row")).toHaveLength(6);
  });

  it('renders "No items found" message when items is empty and not loading', () => {
    render(
      <ItemTable
        items={[]}
        loading={false}
        onDelete={jest.fn()}
        currentPage={1}
        totalPages={1}
        onPageChange={jest.fn()}
      />
    );
    expect(screen.getAllByText(/no items found/i)[0]).toBeInTheDocument();
  });

  it("renders pagination controls when there are items", () => {
    render(
      <ItemTable
        items={mockItems}
        loading={false}
        onDelete={jest.fn()}
        currentPage={1}
        totalPages={3}
        onPageChange={jest.fn()}
      />
    );
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /previous page/i })
    ).toBeInTheDocument();
  });

  describe("ItemTable Delete Interaction", () => {
    it("shows confirmation dialog when delete button is clicked", () => {
      render(
        <ItemTable
          items={mockItems}
          loading={false}
          onDelete={jest.fn()}
          currentPage={1}
          totalPages={1}
          onPageChange={jest.fn()}
        />
      );
      // Get all delete buttons and click the first one
      const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
      fireEvent.click(deleteButtons[0]);

      // The confirmation dialog should appear
      expect(screen.getByText(/are you sure\?/i)).toBeInTheDocument();
      expect(
        screen.getByText(/this action cannot be undone/i)
      ).toBeInTheDocument();
    });

    it("calls onDelete with correct id when delete is confirmed", () => {
  const onDelete = jest.fn();
  render(
    <ItemTable
      items={mockItems}
      loading={false}
      onDelete={onDelete}
      currentPage={1}
      totalPages={1}
      onPageChange={jest.fn()}
    />
  );
  // Click the first delete button
  const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
  fireEvent.click(deleteButtons[0]);

  // Click the "Delete" button in the confirmation dialog
  const confirmDeleteButton = screen.getByRole("button", { name: /^delete$/i });
  fireEvent.click(confirmDeleteButton);

  // Assert onDelete was called with the correct id
  expect(onDelete).toHaveBeenCalledWith(mockItems[0]._id);
});
  });

  
});
