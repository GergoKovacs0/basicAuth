import React from 'react';
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import apiClient from '../utils/axios';
import { Bounce, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const response = await apiClient.post('/login', { username, password });

            if (response.status === 500) {
                throw new Error('Hiba lépett fel a szerver oldalon!');
            }

            if (response.status === 401) {
                throw new Error('Hibás felhasználónév vagy jelszó!');
            }

            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
            sessionStorage.setItem('token', response.data.token);
            navigate('/protected');
        } catch (error) {
            toast.error('Hiba lépett fel a szerver oldalon!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <h1 className="text-center mb-4">Bejelentkezés</h1>
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Felhasználó név:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Felhasználó név"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className="mt-3">
                                    <Form.Label>Jelszó:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Jelszó"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 mt-4">
                                    Bejelentkezés
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
