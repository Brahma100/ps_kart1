
import React from "react";
import ProductList from "./components/productList/ProductList";
import CartProvider from "./context/CartProvider";
import ProductProvider from "./context/ProductProvider";

const App = () => {
    return (
        <ProductProvider>
            <CartProvider>
                <header>
                    <h1 style={{ textAlign: 'center' }}>PS Kart</h1>
                </header>
                <ProductList />
            </CartProvider>
        </ProductProvider>

    )
}

export default App