import React, { useState } from 'react';
import ProductListItem from "./ProductListItem.jsx";

export default function ProductsList({ products }) {
    const [productsToShow, setProductsToShow] = useState(5);

    const loadMoreProducts = () => {
        if (productsToShow >= products.length) {
            return;
        } else {
            setProductsToShow(prevProductsToShow => prevProductsToShow + 5);
        }
    };

    return (
        <div className='row my-5'>
            {
                products.slice(0, productsToShow).map(product => (
                    <ProductListItem product={product} key={product.id} />
                ))
            }
            {
                productsToShow < products.length && (
                    <div className="d-flex justify-content-center my-3">
                        <button className="btn btn-sm btn-dark" onClick={loadMoreProducts}>
                            <i className="bi bi-arrow-clockwise"></i> {" "} Load More
                        </button>
                    </div>
                )
            }
        </div>
    );
}
