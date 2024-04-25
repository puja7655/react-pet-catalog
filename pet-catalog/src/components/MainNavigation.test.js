import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainNavigation from './MainNavigation';

test('renders MainNavigation component correctly', () => {
    render(
        <MemoryRouter>
            <MainNavigation />
        </MemoryRouter>
    );

    const titleElement = screen.getByText('Pet Catalog');
    expect(titleElement).toBeInTheDocument();

    const adminLink = screen.getByText('Admin');
    expect(adminLink).toBeInTheDocument();

    const petsLink = screen.getByText('Pets');
    expect(petsLink).toBeInTheDocument();
});
