import React,{ createContext, useEffect, useState } from "react";
import SHOP_DATA from "../data/data";

export const ProductContext = createContext({
    pageNo: localStorage.getItem('pageNo') || 1,
    setPageNo: () => { },
    products: [],
    totalItems:SHOP_DATA.items.length, 
    dataLimit:8
})
const ProductProvider = ({ children }) => {
    const [pageNo, setPageNo] = useState(localStorage.getItem('pageNo') || 1);
    const [dataLimit, setDataLimit] = useState(8);
    const [totalItems, setTotalItems] = useState(SHOP_DATA.items.length);
    const [products, setProducts] = useState(SHOP_DATA.items.slice((pageNo-1)*dataLimit,pageNo*dataLimit));
    useEffect(()=>{
        setProducts(SHOP_DATA.items.slice((pageNo-1)*dataLimit,pageNo*dataLimit));
    },[pageNo])

    const value = { products, pageNo, dataLimit, setPageNo, totalItems };
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}
export default ProductProvider;