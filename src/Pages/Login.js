import React, { useEffect, useRef, useState } from 'react';
import {Card, Form, Button, Alert, Container} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import logo from '../components/logo.png'
import { Image } from "react-bootstrap";

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const navigate = useNavigate()


    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(currentUser) {
            navigate('/')
        }
    }, [])

    async function handleLogin(e) {
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError("Invalid Credentials")
        }

        setLoading(false)
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className='w-100 ' style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <Image src={logo} width={50} height={50} className="rounded mx-auto d-block" ></Image>
                            <h2 className="text-center mb-4">Project Manager</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleLogin}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-3" type='Submit'>Login</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}