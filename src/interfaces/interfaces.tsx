export interface Props {
    children: React.ReactNode;
}
export interface IProduct {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}
export interface ICartItem {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
}
export type CartContextType = {
    addItemToCart: (product: IProduct) => void;
    removeItemFromCart: (product: IProduct) => void;
    cartItems: ICartItem[];
    cartCount: number;
}
export type ProductContextType = {
    setPageNo: (page: number) => void;
    products: IProduct[];
    pageNo: number | string;
    totalItems: number;
    dataLimit: number;
}
export type DataType={
    items:IProduct[]
  }