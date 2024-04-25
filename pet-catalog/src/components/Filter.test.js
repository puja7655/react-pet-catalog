import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';

const mockOnFilter = jest.fn();
const mockOnClearFilter = jest.fn();

test('renders Filter component correctly', () => {
    render(
        <Filter
            onFilter={mockOnFilter}
            onClearFilter={mockOnClearFilter}
        />
    );

    expect(screen.getByText('All Tags:')).toBeInTheDocument();
    expect(screen.getByText('Status:')).toBeInTheDocument();

    expect(screen.getByText('Apply Filters')).toBeInTheDocument();
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    const statusDropdown = screen.getByRole('combobox');
    fireEvent.change(statusDropdown, { target: { value: 'available' } });

    expect(statusDropdown).toHaveValue('available');

    const applyFiltersButton = screen.getByText('Apply Filters');
    fireEvent.click(applyFiltersButton);

    expect(mockOnFilter).toHaveBeenCalledWith(['Friendly', 'Playful'], 'available');

    const clearFiltersButton = screen.getByText('Clear Filters');
    fireEvent.click(clearFiltersButton);

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(statusDropdown).toHaveValue('');

    expect(mockOnClearFilter).toHaveBeenCalled();
});
