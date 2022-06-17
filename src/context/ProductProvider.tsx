import { createContext, FC, useEffect, useState } from "react";
// import SHOP_DATA from "../data/data";
import { IProduct, ProductContextType, Props } from "../interfaces/interfaces";

export const ProductContext = createContext<ProductContextType>({
    pageNo: localStorage.getItem('pageNo') || 1,
    setPageNo: () => { },
    products: [],
    totalItems: 0,
    dataLimit: 8,
    loading: false
})
const ProductProvider: FC<Props> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [items, setItems] = useState([]);
    const [pageNo, setPageNo] = useState<number | string>(localStorage.getItem('pageNo') || 1);
    const [dataLimit] = useState<number>(8);
    const [totalItems, setTotalItems] = useState<number>(items.length);
    const [products, setProducts] = useState<IProduct[]>(items);
    useEffect(() => {
        setLoading(true)
        fetch(`/api/items?pageNo=${pageNo}&itemCount=${dataLimit}`)
            .then(res => res.json())
            .then(data => {
                const { products, total } = data;
                setItems(products)
                setTotalItems(total);
                // console.log(totalItems)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                console.log("Error While fetching products", err?.message);
            });
    }, [pageNo])

    useEffect(() => {
        setProducts(items);
    }, [pageNo, items])
    console.log("Data::", items)
    const value = { loading, products, pageNo, dataLimit, setPageNo, totalItems };
    return <ProductContext.Provider value={value}> {children} </ProductContext.Provider>
}
export default ProductProvider;