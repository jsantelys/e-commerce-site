import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase';

// const ACTIONS = {
//     ADD_TO_CART: 'ADD_TO_CART',

// }

// function reducer(state, action) {
//     switch (action.type) {
//         default:
//             return state;
//     }
// }

const Products = () => {
    //const [state, dispatch] = useReducer(reducer, []);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const productsFromServer = await fetchData()
            setProducts(productsFromServer.docs.map(doc => doc.data()));
        }

        getData();
    }, [])

    const fetchData = () => {
        return db.collection('Products').get()
    }

    // function test() {
    //     dispatch({ type: "ADD_TO_CART" })
    // }

    return (
        <>
            {products.length !== 0 && <h1>Products</h1>}

        </>
    )
}

export default Products
