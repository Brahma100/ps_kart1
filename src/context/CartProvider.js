import React, { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, product) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id == product.id
    )
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === product.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
    }
    return [...cartItems, { ...product, quantity: 1 }];
}
const removeCartItem = (cartItems, product) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id == product.id
    )
    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem.id == product.id ?
                { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
    }
    return cartItems.filter((cartItem) =>
        cartItem.id !== product.id
    )
}

export const CartContext = createContext({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cartCount: 0
})
const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        )
        setCartCount(newCount);
    }, [cartItems])

    const addItemToCart = (product) => {
        let temp=addCartItem(cartItems, product);
        localStorage.setItem('cartItems',JSON.stringify(temp))
        setCartItems(temp);
    }
    const removeItemFromCart = (product) => {
        let temp=removeCartItem(cartItems, product);
        localStorage.setItem('cartItems',JSON.stringify(temp))
        setCartItems(temp);
    }

    const value = { cartItems, cartCount, addItemToCart, removeItemFromCart };
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
export default CartProvider;