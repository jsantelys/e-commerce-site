import { Nav, Navbar, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { BsCart4 } from 'react-icons/bs'
import { Link } from 'react-router-dom';
const NavBar = () => {

    const { currentUser } = useAuth()

    const NavBarElements = () => {
        return (
            <>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Dashboard</Link>
                    </Nav>
                    <Nav className='justify-content-end'>
                        <Nav className="justify-content-space-around">
                            <Link className="nav-link" to='/cart' style={{ textDecoration: 'none' }}><BsCart4 /></Link>
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </>
        )
    }
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Link to='/' className="navbar-brand">E-Commerce</Link>
                    {currentUser && <NavBarElements />}
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
