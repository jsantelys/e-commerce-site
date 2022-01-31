import React from 'react'
import IndividualCartProduct from './IndividualCartProduct'
const CartProducts = ({ cart, cartProductAdd, cartProductRemove }) => {

    return cart.map(product => (
        <IndividualCartProduct key={product.ID} product={product} cartProductAdd={cartProductAdd}
            cartProductRemove={cartProductRemove} />
    ))
}

export default CartProducts
