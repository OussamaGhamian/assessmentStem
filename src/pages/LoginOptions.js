import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "react-bootstrap/Button"
import { Col, Row, Stack } from 'react-bootstrap'
import { BsMicrosoft, BsGoogle } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import notificationFactory from '../notifier'
import AuthContext from '../context/AuthProvider'

const LoginOptions = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const demoNotification = () => notificationFactory('Demo!', 'This is button for demo purposes only.', 'info');

    return (
        // TODO move to be on the route level
        auth && auth?.identity ?
            navigate('/dashboard')
            :
            <section>
                <Row className="justify-content-center align-item-center">
                    <Col md={6} lg={4}>
                        <h1 className='mb-5 text-center'>uOAuth</h1>
                        <hr />
                        <p className='text-secondary mb-5 text-center'>A modernized and unified identity authentication interface for all of OutStem's applications</p>
                        <Stack gap={5} className="bg-light border border-radius-5 p-5">
                            <Button onClick={() => demoNotification()}><BsMicrosoft /><span className='m-2'>Microsoft</span></Button>
                            <Button onClick={() => demoNotification()}><BsGoogle /><span className='m-2'>Google</span></Button>
                            <hr className='separator' />
                            <Button variant="outline-secondary"
                                onClick={() => navigate('/login')}>
                                <MdEmail size={25} />
                                <span className='m-2'>Email</span>
                            </Button>
                        </Stack>
                    </Col>
                </Row>
            </section>
    )
}

export default LoginOptions