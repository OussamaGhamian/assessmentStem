import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import notificationFactory from '../notifier';

const ResetPass = ({ setShowReset }) => {
    const [password, setPassword] = useState('');
    const [rePassword, setRepassword] = useState('');
    const passRef = useRef();

    useEffect(() => {
        passRef.current.focus();
    }, [])


    const handleSubmit = e => {
        e.preventDefault();
        if (password === rePassword) {
            notificationFactory('Hooray!', 'Reset password succeeded', 'success');
            setShowReset(false);
            return;
        }
        notificationFactory('Opss!', 'Reset password failed unmatched passwords', 'danger');
    }
    return (
        <Row className="d-flex justify-content-center align-item-center">
            <Col lg={6}>
                <h1>Reset password</h1>
                <hr className='my-4' />
                <Form onSubmit={handleSubmit} className="d-flex flex-column bg-light border p-4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='align-self-left'>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            ref={passRef}
                            minLength={8}
                            required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Re-password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={e => setRepassword(e.target.value)}
                            value={rePassword}
                            minLength={8}
                            required />
                    </Form.Group>
                    <div className='d-flex justify-content-around mt-5'>
                        <Button variant="success" type="submit" >
                            Submit
                        </Button>
                        <Button variant='outline-danger' onClick={() => setShowReset(false)}>Cancel</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}

export default ResetPass