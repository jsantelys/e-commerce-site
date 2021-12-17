import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase'

const Product = ({ id, name, price, img, definition }) => {

    const { currentUser } = useAuth()
    const [added, setAdded] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddCart = async () => {
        setLoading(true);

        const data = await fetchData();
        const previousProduct = data.docs.map(doc => ({
            ProductId: doc.data().ProductId,
            ...doc.data()
        })).filter(element => element.ProductId === id)
        let product = {}

        if (previousProduct.length !== 0) {
            product = {
                ...previousProduct[0],
                ProductQty: previousProduct[0].ProductQty + 1,
            }
        }
        else {
            product = {
                ProductId: id,
                ProductName: name,
                ProductDefinition: definition | '',
                ProductPrice: Number(price),
                ProductImg: img,
                ProductQty: 1,
                ProductTotal: price * 1
            }
        }

        db.collection('Cart' + currentUser.uid).doc(product.ProductId).set(product)
            .then(() => {
                setAdded(true);
            })
            .catch((error) => {
                setAdded(false);
                setLoading(false);
            })
            .finally(() => {
            })

    }

    const fetchData = () => {
        return db.collection('Cart' + currentUser.uid).get()
    }

    return (
        <Card key={id}>
            <Card.Img style={{ objectFit: "scale", width: "100%", height: "200px" }} variant="top" src={img} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle className="mb-2 mt-1">Price: {price}$</Card.Subtitle>
                {definition && <Card.Text>{definition}</Card.Text>}
                <Button disabled={loading} className="w-100" variant='warning' onClick={handleAddCart}>{added ? 'In Cart!' : 'ADD TO CART'}</Button>
            </Card.Body>
        </Card>
    )
}

export default Product
