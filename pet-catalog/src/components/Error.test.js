// Import necessary dependencies for testing
import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './Error';

test('renders Error component correctly', () => {
    const title = 'Failed to submit Order';
    const message = 'Network error occurred. Please try again.';

    render(<Error title={title} message={message} />);

    const titleElement = screen.getByText(title);
    const messageElement = screen.getByText(message);

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
});
