import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import notificationFactory from '../notifier';
import AuthContext from '../context/AuthProvider';


const Signup = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { auth } = useContext(AuthContext);
    const userRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        notificationFactory('Awesome!', 'Your account has been created successfully', 'success');
        navigate('/login');
    }
    return (
        // TODO move to be on the route level
        auth && auth?.identity ?
            navigate('/dashboard')
            :
            <Row Row className="d-flex justify-content-center align-item-center" >
                <Col lg={6}>
                    <h1 className='text-center'>Sign up</h1>
                    <hr className='my-4' />
                    <p className='text-secondary mb-5 text-center'>New here? let's help you in setup your account</p>
                    <Form onSubmit={handleSubmit} className="d-flex flex-column bg-light border p-4">
                        <Form.Group className=" d-flex justify-content-between mb-3">
                            <Form.Group>
                                <Form.Label className='align-self-left'>First name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    autoComplete='off'
                                    onChange={e => setFname(e.target.value)}
                                    value={fname}
                                    ref={userRef}
                                    required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='align-self-left'>Last name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    autoComplete='off'
                                    onChange={e => setLname(e.target.value)}
                                    value={lname}
                                    required />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='align-self-left'>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                autoComplete='off'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                minLength={8}
                                required />
                        </Form.Group>

                        <Button className='w-50 align-self-center' variant="success" type="submit" >
                            Sign up
                        </Button>
                    </Form>
                </Col>
            </Row>
    )
}

export default Signup
