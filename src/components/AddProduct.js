import { useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { storage, db } from '../firebase';

const AddProduct = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)
    const [productImg, setProductImg] = useState(null)
    const types = ['image/png', 'image/jpeg']

    const productImgHandler = (e) => {
        setError('')
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
        }
        else {
            setProductImg(null);
            setError('Please select a valid img type (PNG or JPG)')
        }
    }

    function handleSubmit(e) {
        e.preventDefault()

        setLoading(true);
        setSuccess('');
        setError('');

        //storing the img

        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, error => {
            setError(error.message)
            setLoading(false)
        }, () => {
            //getting product url and if success then stores the product in db
            storage.ref('product-images').child(productImg.name).getDownloadURL()
                .then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: productPrice,
                        ProductImg: url
                    })
                        .then(() => {
                            setProductName('')
                            setProductPrice(0);
                            setProductImg(null);
                            setError('');
                            document.getElementById('file').value = '';
                            setSuccess('Product added sucessfully.')
                        })
                        .catch(error => {
                            setError(error.message);
                        })
                        .finally(() => {
                            setLoading(false);
                        })
                })
        })
    }

    return (
        <>
            <div className='w-100' style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Add Product</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {success && <Alert variant="success">{success}</Alert>}
                        <Form onSubmit={handleSubmit} >
                            <Form.Group id='text'>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type='text' onChange={(e) => setProductName(e.target.value)} value={productName} required />
                            </Form.Group>
                            <Form.Group id='number'>
                                <Form.Label>Product Price</Form.Label>
                                <Form.Control type='number' onChange={(e) => setProductPrice(e.target.value)} value={productPrice} required />
                            </Form.Group>
                            <Form.Group id='file'>
                                <Form.Label>Product Image</Form.Label>
                                <Form.Control type='file' onChange={productImgHandler} />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-2 btn-dark" type="submit">Add</Button>
                        </Form>
                        <div className='w-100 text-center mt-3'>
                            <Link to='/'>Back to Dashboard</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need An Account? <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </>
    )
}

export default AddProduct

