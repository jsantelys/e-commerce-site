import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import { ListGroup } from 'react-bootstrap'

const Cart = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const productsFromServer = await fetchData()
            const productsData = productsFromServer.docs.map(doc => ({
                ProductId: doc.id,
                ProductName: doc.data().ProductName,
                ProductPrice: doc.data().ProductPrice,
                ProductImg: doc.data().ProductImg
            }))

            const numberOfRows = Math.ceil(productsData.length / 3)

            setProducts(Array(numberOfRows).fill().map((_, rowIndex) =>
                productsData.slice(rowIndex * 3, (rowIndex * 3) + 3)))
        }
        getData();
    }, [])

    // const fetchData = () => {
    //     return db.collection('Products').get()
    // }


    const { currentUser } = useAuth();
    // const [Cart, setCart] = useState([]);

    // useEffect(() => {
    //     const getData = async () => {
    //         const productsFromServer = await fetchData()
    //         const productsData = productsFromServer.docs.map(doc => ({
    //             ProductId: doc.id,
    //             ProductName: doc.data().ProductName,
    //             ProductPrice: doc.data().ProductPrice,
    //             ProductImg: doc.data().ProductImg
    //         }))
    //         setCart(productsData)
    //     }
    //     getData();
    // }, [])

    const fetchData = () => {
        return db.collection('Cart' + currentUser.uid).get()
    }

    return (
        <ListGroup>

        </ListGroup>
    )
}

export default Cart
