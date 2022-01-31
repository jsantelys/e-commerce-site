import React from 'react';
import { Card } from 'react-bootstrap';
import { BsDashCircle, BsPlusCircle } from 'react-icons/bs';
import '../styles/cartProducts.css'

const IndividualCartProduct = ({ product, cartProductAdd, cartProductRemove }) => {

    const handleAdd = () => {
        cartProductAdd(product)
    }

    const handleRemove = () => {
        cartProductRemove(product)
    }

    return (
        <Card key={product.ProductID} className='d-flex justify-content-between align-items-center' >
            <div className="Cart-Items m-1">
                <Card.Img className="mb-1 mt-1 text-center" src={product.ProductImg} style={{ objectFit: "scale", width: "15%", height: "80px" }} />
                <Card.Body className='align-items-center'>
                    <Card.Title className='title'>{product.ProductName}</Card.Title>
                    <Card.Text>
                        <BsDashCircle className='m-2' onClick={handleRemove} style={{ cursor: "pointer" }}></BsDashCircle>
                        {product.ProductQty}
                        <BsPlusCircle className='m-2' onClick={handleAdd} style={{ cursor: "pointer" }}></BsPlusCircle>
                    </Card.Text>
                    <div className='prices'>

                    </div>
                </Card.Body>
            </div>
        </Card>
    );
};

export default IndividualCartProduct;
