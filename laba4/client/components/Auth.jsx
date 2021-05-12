import React from "react";
import { Alert, Button, Form } from "react-bootstrap";

class Auth extends React.Component {


    constructor(props) {
        super(props);

        this.state={
            login:'',
            pass:''
        }
 
        this.handleLoginChange=this.handleLoginChange.bind(this);
        this.handlePassChange=this.handlePassChange.bind(this);

        this.handleBackClick= this.handleBackClick.bind(this);
        this.handleLoginClick=this.handleLoginClick.bind(this);

    }

    handleLoginChange(event) {
        this.setState({ login: event.target.value });
    };

    handlePassChange(event) {
        this.setState({ pass: event.target.value });
    };

    handleBackClick(){
        console.log("backclick");
        this.props.onBack();
    }

    handleLoginClick(){

        console.log(this.state);

        const user ={
            login:this.state.login,
            pass:this.state.pass
        }

        this.props.onUserLogin(user);
    };

    render() {
        let error=<div></div>;
        // if (this.state.error !== "") {
        //     error= <div class="error">
        //                     <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        //                         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        //                         <p>
        //                             Change this and that and try again. Duis mollis, est non commodo
        //                     </p>
        //                     </Alert>
        //     </div>
        // } 
        return (
            <div class="auth_container">
                <div class="auth">
                    <div class="header_auth">
                        <h2>LOGIN</h2>
                    </div>

                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Login</Form.Label>
                            <Form.Control type="text" placeholder="Enter login" onChange={this.handleLoginChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.handlePassChange}/>
                        </Form.Group>

                        <div class="btn_container">
                            <div class="mybtns"><Button variant="primary" onClick={this.handleLoginClick}>Login</Button></div>
                            <div class="mybtns"><Button variant="secondary" onClick={this.handleBackClick}>Back</Button></div>
                        </div>
                        {/* {error} */}
                    </Form>
                </div>
            </div>
        );
    }

}

export default Auth;