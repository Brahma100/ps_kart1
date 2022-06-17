
import React,{FC} from "react";
import {Link,BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import ProductList from "./components/productList/ProductList";
import CartProvider from "./context/CartProvider";
import ProductProvider from "./context/ProductProvider";
import './App.css';
import Login from "./components/login/Login";

const App:FC = () => {
    return (
        <ProductProvider>
            <CartProvider>
                <Router>
                   
                <header>
                    <nav className="nav" style={{ textAlign: 'center' }}>
                        <ul>
                            <li className="logo"><Link to='/'><span>PS Kart</span></Link></li>
                            <li><Link to='/'>Home</Link></li>
                            {/* <li><Link to='/shop'>Shop</Link></li> */}
                            <li><Link to='/login'>Login</Link></li>
                            <li><Link to='/register'>Register</Link></li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                        <Route index element={<ProductList/>}/>
                        <Route path='/login' element={<Login/>}/>
                        {/* <Route path='/shop' element={<ProductList/>}/> */}
                        {/* <Route index element={<App/>}/> */}
                    </Routes>
                {/* <ProductList /> */}
                </Router>
            </CartProvider>
        </ProductProvider>

    )
}

export default App