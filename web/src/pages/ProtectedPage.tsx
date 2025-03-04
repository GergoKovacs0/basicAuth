import React, { useEffect, useState } from 'react';
import { Button, Container, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/axios';
import { Bounce, toast } from 'react-toastify';

const ProtectedPage: React.FC = () => {
    const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
    const [password, setPassword] = useState(sessionStorage.getItem('password') || '');
    const [token, setToken] = useState(sessionStorage.getItem('token') || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (!username || !password) {
            navigate('/login');
        }
    }, [username, password, navigate]);

    const protectedGet = async () => {
        try {
            const response = await apiClient.get('/protected', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success(response.data.message, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Bounce,
                });
                return;
            }

            toast.warn('Szerintem ehez nincsen jogod!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
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
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="w-50">
                <Card.Body>
                    <h1 className="text-center mb-4">Protected Page</h1>
                    <Button variant="primary" className="w-100" onClick={protectedGet}>
                        Protected Get
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProtectedPage;
