import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './Product';

const Dashboard = () => {
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

    const fetchData = () => {
        return db.collection('Products').get()
    }

    return (
        <>
            <Container fluid="lg">
                <Row>
                    {products.length !== 0 ? <h2 className='text-center mb-4'>Products</h2>
                        : <h1 className="d-flex align-items-center justify-content-center">Checking products...</h1>}
                </Row>
                {products.map((productGroup, index) => (
                    <Row key={index} className="mb-3">
                        {
                            productGroup.map(product => (
                                <Col md="4" >
                                    <Product id={product.ProductId} name={product.ProductName}
                                        price={product.ProductPrice} img={product.ProductImg} />
                                </Col>
                            ))
                        }
                    </Row>
                ))}

            </Container>
        </>
    )
}

export default Dashboard
