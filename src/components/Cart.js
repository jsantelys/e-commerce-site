import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'
import CartProducts from './CartProducts'

const Cart = () => {

    const { currentUser } = useAuth();
    const [cart, setCart] = useState([]);

    useEffect(() => {

        const fetchData = () => {
            return db.collection('Cart' + currentUser.uid).get()
        }

        const getData = async () => {
            const productsFromServer = await fetchData()
            const productsData = productsFromServer.docs.map(doc => ({
                ID: doc.id,
                ...doc.data(),
            }))
            setCart(productsData)
        }
        getData();
    }, [currentUser])



    const cartRemoveAll = async () => {
        const ref = db.collection('Cart' + currentUser.uid)
        ref.onSnapshot((snapshot) => {
            snapshot.docs.forEach((doc) => {
                ref.doc(doc.id).delete()
            })
        })
        setCart([]);
    }



    const cartProductAdd = (cartProduct) => {
        const newCart = [...cart]
        let product = newCart.find(x => x.ID === cartProduct.ID)
        product.ProductQty++;
        product.ProductTotal = product.ProductQty * product.ProductPrice;
        db.collection('Cart' + currentUser.uid).doc(cartProduct.ID).update(product).then(() => {
        })
        setCart(newCart);
    }

    const cartProductRemove = (cartProduct) => {
        if (cartProduct.ProductQty > 1) {
            const newCart = [...cart]
            let product = newCart.find(x => x.ID === cartProduct.ID)
            product.ProductQty--;
            product.ProductTotal = product.ProductQty * product.ProductPrice;
            db.collection('Cart' + currentUser.uid).doc(cartProduct.ID).update(product).then(() => {
            })
            setCart(newCart);
        }
    }


    return (
        <div className="Cart-Container">
            <div className='Header'>
                <h3 className='Heading'>Shopping Cart</h3>
                <h5 className='Action' onClick={cartRemoveAll}>Remove all</h5>
            </div>
            {cart.length > 0 &&
                <CartProducts cart={cart} cartProductAdd={cartProductAdd} cartProductRemove={cartProductRemove} />
            }{cart.length < 1 && (
                <h2>No Items in cart yet!</h2>
            )}
        </div>
    )
}

export default Cart
