import React, { FC, useContext } from 'react';
import './ProductList.scss'
import ProductCard from '../productCard/ProductCard';
import { ProductContext } from '../../context/ProductProvider';
import Pagination from '../pagination/Pagination';
// import PropTypes  from 'prop-types';

const ProductList:FC = () => {
    const { products } = useContext(ProductContext);

    return <div className='container'>
            <article>
                <div className='product-wrapper'>
                    {products?.length > 0 && products.map(({ id, ...otherDataPorps }) => (
                        <ProductCard key={id} id={id} {...otherDataPorps} />
                    ))}
                </div>
            </article>
            <Pagination/>
        </div>
}
// ProductList.propTypes = {
//     children: PropTypes.element.isRequired
//   };
export default ProductList;