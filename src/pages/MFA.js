import { Button } from 'react-bootstrap';
import React, { useState, useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import notificationFactory from '../notifier';
import AuthContext from '../context/AuthProvider';

const MFA = () => {
    const [codeMFA, setCodeMFA] = useState('');
    const { auth, setAuth } = useContext(AuthContext)
    const navigate = useNavigate();
    const MFA_URI = '/auth/mfa';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(MFA_URI, JSON.stringify({
                code: codeMFA,
                email: auth.email
            }));
            notificationFactory('Welcome!', 'Logged in successfully!', 'success');
            const authToken = {
                "email": auth.email,
                "identity": response?.data?.identity
            };
            setAuth(authToken);
            // TODO localStorage is not safe, use refresh toke instead
            localStorage.setItem('auth', JSON.stringify(authToken));
            navigate('/dashboard')
        } catch (err) {
            notificationFactory('Opss!', err?.response?.data?.message ?? 'error', 'danger')
        }

    }
    return (
        // TODO move to be on the route level
        auth && auth?.identity ?
            navigate('/dashboard')
            :
            <Row className="d-flex justify-content-center align-item-center">
                <Col lg={6}>
                    <h1 className='mb-5 text-center'>Multi-Factor Authentication</h1>
                    <Form onSubmit={handleSubmit} className="bg-light border border-radius-5 p-3">
                        <Form.Group className="mb-3">
                            <Form.Label>Code</Form.Label>
                            <Form.Control
                                type="test"
                                placeholder="Enter MFA code"
                                autoComplete='off'
                                onChange={e => setCodeMFA(e.target.value)}
                                value={codeMFA}
                                required />
                        </Form.Group>
                        <Button className='w-50 align-self-center' variant="success" type="submit" disabled={!codeMFA.length}>
                            Sign in
                        </Button>
                    </Form>
                </Col>
            </Row>
    )
}

export default MFA