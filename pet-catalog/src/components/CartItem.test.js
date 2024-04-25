import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from './CartItem';

jest.mock('../util/formatting', () => ({
    currencyFormatter: jest.fn(),
}));

const testProps = {
    name: 'Test Product',
    quantity: 3,
    price: 10.99,
    onIncrease: jest.fn(),
    onDecrease: jest.fn(),
};

test('renders CartItem component correctly', () => {
    render(
        <CartItem
            name={testProps.name}
            quantity={testProps.quantity}
            price={testProps.price}
            onIncrease={testProps.onIncrease}
            onDecrease={testProps.onDecrease}
        />
    );

    const productInfo = screen.getByText(`${testProps.name}-${testProps.quantity}`);
    expect(productInfo).toBeInTheDocument();

    const decreaseButton = screen.getByText('-');
    const increaseButton = screen.getByText('+');
    expect(decreaseButton).toBeInTheDocument();
    expect(increaseButton).toBeInTheDocument();

    fireEvent.click(decreaseButton);
    expect(testProps.onDecrease).toHaveBeenCalled();

    fireEvent.click(increaseButton);
    expect(testProps.onIncrease).toHaveBeenCalled();
});
