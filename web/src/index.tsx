import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedPage from './pages/ProtectedPage';
import Navigation from './components/Navigation';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <ToastContainer />
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/protected" element={<ProtectedPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
