import React from 'react';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import apiClient from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = sessionStorage.getItem('token') || '';

            const response = await apiClient.post('/logout', {
                token,
            });

            if (response.status === 200) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('username');
                sessionStorage.removeItem('password');
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Base Auth</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Button variant="outline-light" onClick={handleLogout}>
                            Kijelentkezés
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
