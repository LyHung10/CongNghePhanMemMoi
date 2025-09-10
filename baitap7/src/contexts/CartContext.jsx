import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const item = action.payload;
            const found = state.items.find(i => i.id === item.id);
            if (found) {
                return {
                    ...state,
                    items: state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i)
                };
            }
            return { ...state, items: [...state.items, { ...item, quantity: item.quantity || 1 }] };
        }
        case 'UPDATE': {
            const { id, quantity } = action.payload;
            return { ...state, items: state.items.map(i => i.id === id ? { ...i, quantity } : i) };
        }
        case 'REMOVE':
            return { ...state, items: state.items.filter(i => i.id !== action.payload) };
        case 'CLEAR':
            return { ...state, items: [] };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addItem = item => dispatch({ type: 'ADD', payload: item });
    const updateItem = (id, quantity) => dispatch({ type: 'UPDATE', payload: { id, quantity } });
    const removeItem = id => dispatch({ type: 'REMOVE', payload: id });
    const clear = () => dispatch({ type: 'CLEAR' });

    const total = state.items.reduce((s, it) => s + (it.price || 0) * it.quantity, 0);
    const count = state.items.reduce((s, it) => s + it.quantity, 0);

    return (
        <CartContext.Provider value={{ items: state.items, addItem, updateItem, removeItem, clear, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart phải được bọc trong CartProvider');
    return ctx;
};
