import { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLoading(true);
            await resetPassword(emailRef.current.value)
                .then(() => {
                    setMessage('Check your email for further instructions')
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        setError("Such email doesn't exist.Try to Sign Up");
                    }
                    else setError(error.message);
                })
        } catch {
            setError('Failed to Reset Password');
        }

        setLoading(false);
    }

    return (
        <>
            <div className='w-100' style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Recover Password</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variante="info">{message}</Alert>}
                        <Form onSubmit={handleSubmit} >
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-2 btn-dark" type="submit">Reset Password</Button>
                        </Form>
                        <div className='w-100 text-center mt-3'>
                            <Link to='/login'>Login</Link>
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

export default ForgotPassword
