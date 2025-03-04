import express from 'express';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS

const generateToken = () => {
    return crypto.randomBytes(8).toString('hex'); // 8 bytes = 16 characters in hex
};

const tokens = [];

const users = [
    { username: 'admin', password: 'password' },
    { username: 'user', password: 'password' },
];

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token || !tokens.includes(token)) {
        return res.sendStatus(403); // Forbidden
    }
    next();
};

// Endpoint to receive username and password
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users.find((user) => user.username === username && user.password === password)) {
        const token = generateToken();
        tokens.push(token);
        res.status(200).json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.post('/logout', (req, res) => {
    const { token } = req.body;
    const index = tokens.indexOf(token);
    if (index > -1) {
        tokens.splice(index, 1);
    }
    res.status(200).json({ message: 'Logout successful' });
});

app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Protected data' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
