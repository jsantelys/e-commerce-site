import { useState, } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';


const Profile = () => {
    const [error, setError] = useState('')
    const { currentUser, logOut } = useAuth();
    const navigate = useNavigate()

    async function handleLogout() {

        setError('');
        await logOut()
            .then(() => {
                navigate('../login')
            })
            .catch(error => {
                setError(error.message);
            })

    }

    return (
        <>
            <div className='w-100' style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong>Email:</strong> {currentUser.email}
                        <Link to='/update-profile' className="btn btn-dark w-100 mt-3">
                            Update Profile
                        </Link>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Button variant="link" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </>
    )
}

export default Profile
