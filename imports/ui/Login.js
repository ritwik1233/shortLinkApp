import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {
            error: '',
            redirect: Meteor.userId() ? true : false
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({error: err.reason})
            } else {
                this.setState({error: '', redirect: true});
            }
        })
    }
    render () {
        if (this.state.redirect) {
            return (
                <Redirect to = '/links' />
            );
        }
        return (
            <div className = 'boxed-view '>
                <div className = 'boxed-view__box'>
                    <h1> Short Link </h1>
                    { this.state.error ? <p>{this.state.error}</p> : undefined }
                    <form className = 'boxed-view__form' onSubmit = { this.handleSubmit } noValidate >
                        <input type = 'email' ref = 'email' name = 'email' placeholder = 'Email' />
                        <input type = 'password' ref = 'password' name = 'password' placeholder = 'Password' />
                        <button className = 'button'> Login </button>
                    </form>
                    <Link to = '/signup' > Have an account? SignUp </Link>  
                </div>
            </div>
        );
    }

}
export default Login;