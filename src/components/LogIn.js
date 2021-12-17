import { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const LogIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { logIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value)
                .then(() => {
                    navigate('/dashboard')
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        setError('There is no such username')
                    }
                    else if (error.code === 'auth/wrong-password') {
                        setError('Check your Email or Password')
                    }
                    else if (error.code === 'auth/too-many-requests') {
                        setError('Access to this account has been temporarily disabled due to many failed login attempts. Try again later')
                    }
                    else {
                        setError(error.message);
                    }
                });
        } catch {
            setError('Failed to Log In');
        }

        setLoading(false);
    }

    return (
        <>
            <div className='w-100' style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} >
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-2 btn-dark" type="submit">Log In</Button>
                        </Form>
                        <div className='w-100 text-center mt-3'>
                            <Link to='/forgot-password'>Forgot Password?</Link>
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

export default LogIn
