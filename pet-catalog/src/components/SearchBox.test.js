import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBox from './SearchBox';

const mockOnSearch = jest.fn();

test('renders SearchBox component correctly', () => {
    render(<SearchBox onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText('Search by category...');
    expect(inputElement).toBeInTheDocument();
});
