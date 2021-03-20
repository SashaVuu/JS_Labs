import React from "react";
import { Alert, Button, Form } from "react-bootstrap";

class Auth extends React.Component {


    constructor(props) {
        super(props);

        this.state =
        {
            error:""
        };

    }

    render() {
        let error=<div></div>;
        if (this.state.error !== "") {
            error= <div class="error">
                            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                <p>
                                    Change this and that and try again. Duis mollis, est non commodo
                            </p>
                            </Alert>
            </div>
        } 
        return (
            <div class="auth_container">
                <div class="auth">
                    <div class="header_auth">
                        <h2>LOGIN</h2>
                    </div>

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">Login</Button>

                        {error}

                    </Form>
                </div>
            </div>
        );
    }

}

export default Auth;