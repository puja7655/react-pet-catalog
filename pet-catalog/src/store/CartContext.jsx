import { createContext, useReducer } from "react";

const ContextType = createContext({
    item: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { }
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCratItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id);

        const updateItems = [...state.items] //List of all items present
        if (existingCratItemIndex > -1) {
            //If the item is already present i want to increase the quantity .
            const existingItem = state.items[existingCratItemIndex]
            const updatePresentItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updateItems[existingCratItemIndex] = updatePresentItem
        } else {
            updateItems.push({ ...action.item, quantity: 1 })
        }

        return { ...state, items: updateItems }
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCratItemIndex = state.items.findIndex(
            (item) => item.id === action.id);
        const existingCartItem = state.items[existingCratItemIndex]
        const updateItems = [...state.items]

        if (existingCartItem.quantity === 1) {
            updateItems.splice(existingCratItemIndex, 1)
        } else {
            //If the item is already present i want to decrease the quantity .
            const updatePresentItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            }
            updateItems[existingCratItemIndex] = updatePresentItem;
        }
        return { ...state, items: updateItems }
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] }
    }
    return state
}

export function CartContextProvider({ children }) {
    const [cartState, dispatchCartItem] = useReducer(cartReducer, { items: [] })

    function addItem(item) {
        dispatchCartItem({ type: 'ADD_ITEM', item })
    }

    function removeItem(id) {
        dispatchCartItem({ type: 'REMOVE_ITEM', id })
    }

    function clearCart(id) {
        dispatchCartItem({ type: 'CLEAR_CART' })
    }

    const cartContext = {
        items: cartState.items,
        addItem,
        removeItem,
        clearCart
    }

    return <>
        <ContextType.Provider value={cartContext}>{children}</ContextType.Provider>
    </>
}

export default ContextType;