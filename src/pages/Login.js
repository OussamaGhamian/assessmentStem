import React from 'react'
import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Col';
import Col from 'react-bootstrap/Row';
import notificationFactory from '../notifier';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth, setAuth } = useContext(AuthContext);

    const userRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const LOGIN_URI = '/auth';

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            let response = await axios.post(LOGIN_URI,
                JSON.stringify({
                    email,
                    password
                })
            );
            let { identity, challenge } = response?.data;
            setAuth({ email, identity });
            // TODO localStorage is not safe, use refresh toke instead
            localStorage.setItem('auth', JSON.stringify({ email, identity }));
            if (!challenge) {
                notificationFactory('Welcome!', 'Logged in successfully!', 'success');
                navigate('/dashboard')
            } else {
                notificationFactory('Is this you? Hmmm...', 'Enter the MFA code you just received on your phone', 'info');
                navigate('/mfa');
            }
        } catch (err) {
            notificationFactory('Opss!', err?.response.data.message, 'danger');
        }

    }
    return (
        // TODO move oto be on the router level
        auth && auth?.identity ?
            navigate('/dashboard')
            :
            <Row className="d-flex justify-content-center align-item-center">
                <Col>
                    <h1>Log In</h1>
                    <hr className='my-4' />
                    <Form onSubmit={handleSubmit} className="d-flex flex-column bg-light border p-4">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='align-self-left'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                autoComplete='off'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                ref={userRef}
                                required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                required />
                        </Form.Group>
                        <Form.Text className='my-3 w-80'>
                            <Link to='/signup'>Do not have an account?</Link>
                        </Form.Text>
                        <Button className='w-50 align-self-center' variant="success" type="submit" >
                            Sign in
                        </Button>
                    </Form>
                </Col>
            </Row>
    )
}

export default Login