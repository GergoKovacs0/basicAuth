import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';

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

            if (response.status === 404) {
                throw new Error('Hibás felhasználónév vagy jelszó!');
            }

            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
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
        <Container>
            <h1>Bejelentkezés</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Felhasznaló név:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Felhasználó név"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Jelszó:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Jelszó"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Bejelentkezés
                </Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
