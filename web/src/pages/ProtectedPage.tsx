import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/axios';

const ProtectedPage: React.FC = () => {
    const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
    const [password, setPassword] = useState(sessionStorage.getItem('password') || '');
    const navigate = useNavigate();
    useEffect(() => {
        if (!username || !password) {
            navigate('/login');
        }
    }, []);

    const protectedGet = async () => {
        const response = await apiClient.get('http://localhost:3001/protected', {
            auth: {
                username,
                password,
            },
        });
    };

    return (
        <Container>
            <h1>Protected page</h1>
            <Button onClick={protectedGet}>Protected get</Button>
        </Container>
    );
};

export default ProtectedPage;
