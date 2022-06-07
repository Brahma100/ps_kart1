import React, { FC, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types';
import './ProductCard.scss';
import { CartContext } from '../../context/CartProvider';

interface Props {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
}
interface IStyleVisible {
    display: string;
}


const ProductCard: FC<Props> = ({ id, name, price, imageUrl }) => {

    const [style, setStyle] = useState<IStyleVisible>({ display: 'none' });
    const [quantity, setQuantity] = useState<number>(0);
    const { addItemToCart, removeItemFromCart, cartItems } = useContext(CartContext);
    useEffect(() => {
        const existing = cartItems.find((item: Props) => item.id === id);
        if (existing)
            setQuantity(existing.quantity);
        else
            setQuantity(0);

    }, [cartItems])
    return (
        <div className='product'
            onMouseEnter={e => {
                setStyle({ display: 'block' });
            }}
            onMouseLeave={e => {
                setStyle({ display: 'none' })
            }}
        >
            <div className={`product_image ${style.display !== 'none' ? 'cover' : ''}`}
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div
                className="button-group"
                style={style}
            >
                {quantity > 0 &&
                    <button className='cart-btn ' onClick={(e) => addItemToCart({ id, name, price, imageUrl })}>+</button>
                }
                <button
                    onClick={() => addItemToCart({ id, name, price, imageUrl })}
                    className='cart-btn '
                >
                    {quantity > 0 ? `${quantity}` : 'Add to Cart'}
                </button>
                {quantity > 0 &&
                    <button className='cart-btn ' onClick={() => removeItemFromCart({ id, name, price, imageUrl })}>-</button>
                }
            </div>
            <div className='product_data'>
                <span className='product_name'>{id + ')'} {name}</span>
                <span className='product_price'>₹{price}</span>
            </div>

        </div>
    )
}
ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
}

export default ProductCard;