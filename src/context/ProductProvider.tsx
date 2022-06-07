import { createContext, FC, useEffect, useState } from "react";
import SHOP_DATA from "../data/data";
import { IProduct, ProductContextType, Props } from "../interfaces/interfaces";

export const ProductContext = createContext<ProductContextType>({
    pageNo: localStorage.getItem('pageNo') || 1,
    setPageNo: () => { },
    products: [],
    totalItems:SHOP_DATA.items.length, 
    dataLimit:8
})
const ProductProvider:FC<Props> = ({ children }) => {
    const [pageNo, setPageNo] = useState<number| string>(localStorage.getItem('pageNo') || 1);
    const [dataLimit, setDataLimit] = useState<number>(8);
    const [totalItems, setTotalItems] = useState<number>(SHOP_DATA.items.length);
    const [products, setProducts] = useState<IProduct[]>(SHOP_DATA.items.slice(((pageNo as number)-1)*dataLimit,(pageNo as number)*dataLimit));
    useEffect(()=>{
        setProducts(SHOP_DATA.items.slice(((pageNo as number)-1)*dataLimit,(pageNo as number)*dataLimit));
    },[pageNo])

    const value = { products, pageNo, dataLimit, setPageNo, totalItems };
    return <ProductContext.Provider value={value}> {children} </ProductContext.Provider>
}
export default ProductProvider;