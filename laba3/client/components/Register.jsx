import React from "react";
import { Alert, Button, Form } from "react-bootstrap";

class Register extends React.Component {

    constructor (props){
        super(props);

        this.state={
           login:'',
           name:'',
           surname:'',
           pass:''
        }

        this.handleLoginChange=this.handleLoginChange.bind(this);
        this.handlePassChange=this.handlePassChange.bind(this);
        this.handleNameChange=this.handleNameChange.bind(this);
        this.handleSurnameChange=this.handleSurnameChange.bind(this);

        this.handleRegisterClick=this.handleRegisterClick.bind(this);
    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    };

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    };

    handlePassChange(event) {
        this.setState({ pass: event.target.value });
    };

    handleSurnameChange(event) {
        this.setState({ surname: event.target.value });
    };

    handleRegisterClick(){
        console.log(this.state);

        const user ={
            login:this.state.login,
            pass:this.state.pass,
            name:this.state.name,
            surname:this.state.surname
        }
        
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
                        <h2>REGISTER</h2>
                    </div>

                    <Form>
                        <Form.Group >
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" onChange={this.handleNameChange} />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Surname:</Form.Label>
                            <Form.Control type="text" placeholder="Enter your surname" onChange={this.handleSurnameChange}/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Login:</Form.Label>
                            <Form.Control type="text" placeholder="Enter login" onChange={this.handleLoginChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handlePassChange}/>
                        </Form.Group>

                        <Button variant="primary" onClick ={this.handleRegisterClick} >Register</Button>
                        
                        {error}

                    </Form>
                </div>
            </div>
        );
    }

}

export default Register;