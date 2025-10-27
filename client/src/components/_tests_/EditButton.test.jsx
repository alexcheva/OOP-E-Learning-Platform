import { render, screen, fireEvent } from '@testing-library/react';
import EditButton from '../buttons/EditButton_new';

describe("EditButton", () => {
  it("renders the edit icon and calls onEdit with the correct item when clicked", () => {
    const mockOnEdit = jest.fn();
    const testItem = { id: 7, name: "Intro to React" };

    render(<EditButton item={testItem} onEdit={mockOnEdit} />);

    // Find the button (MUI gives it role="button")
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();

    // Click the button
    fireEvent.click(button);

    // Check onEdit is called once with the correct item
    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(testItem);
  });
});