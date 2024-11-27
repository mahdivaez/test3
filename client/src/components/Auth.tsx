import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setEmail, setLoggedIn, setUserToken } from '../store/slices/authSlice';
import { Toast, ToastContainer } from 'react-bootstrap';
import './Auth.css';

const Auth: React.FC = () => {
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isRegister ? '/auth-register' : '/auth-login';
    try {
      const response = await axios.post(`https://webtab-task.a-goodarzi.ir/demo/v1${endpoint}`, 
        new URLSearchParams({ email, password })
      );

      if (response.data?.data?.userToken) {
        dispatch(setEmail(email));
        dispatch(setLoggedIn(true));
        dispatch(setUserToken(response.data.data.userToken));
        localStorage.setItem('userToken', response.data.data.userToken);
        navigate('/dashboard');
      } else {
        throw new Error('User token not found in response');
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setToastMessage(`${isRegister ? 'Registration' : 'Login'} failed: ${error.response?.data?.message || error.message}`);
      setShowToast(true);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="mb-0">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        </div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmailState(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">
              {isRegister ? 'Sign Up' : 'Sign In'}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary w-100 btn-lg"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Auth;