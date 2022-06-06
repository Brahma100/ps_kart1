import React, { useContext, useState } from 'react';
import './Pagination.scss'
import { ProductContext } from '../../context/ProductProvider';

const Pagination = () => {
    const { pageNo, setPageNo, totalItems, dataLimit } = useContext(ProductContext);
    const [pages] = useState(Math.round(totalItems / dataLimit));

    const goToNextPage = () => {
        if(pages>pageNo){
            setPageNo((pageNo) => pageNo + 1);
            localStorage.setItem('pageNo',pageNo+1)
        }
    }

    const goToPreviousPage = () => {
        if(pageNo>1){
        setPageNo((pageNo) => pageNo - 1);
        localStorage.setItem('pageNo',pageNo-1)
        }
    }
    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setPageNo(pageNumber);
        localStorage.setItem('pageNo',pageNumber)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((pageNo - 1) / 5) * 5;
        return new Array(5).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <div>
            <div className="pagination">
                <button
                    onClick={goToPreviousPage}
                    className={`prev ${pageNo === 1 ? 'disabled' : ''}`}
                >
                    prev
                </button>

                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`paginationItem ${pageNo === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={`next ${pageNo === pages ? 'disabled' : ''}`}
                >
                    next
                </button>
            </div>
        </div>
    );
}
export default Pagination;