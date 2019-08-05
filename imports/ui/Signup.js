import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
class SignUp extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            error: '',
            redirect: Meteor.userId() ? true : false,
        };
    }
    onSubmit = (e) =>{
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        if (password.length < 9) {
            return this.setState({error: 'Password must be greater than 9 characters'});
        }
        Accounts.createUser({ email, password }, (err) => {
            if (err) {
                this.setState({error: err.reason})
            } else {
                this.setState({error: '', redirect: true})
            }
        });
    }
    render () {
        if (this.state.redirect) {
            return ( 
                <Redirect to = '/links' />
            );
        }
        return (
            <div className = 'boxed-view'>
                <div className = 'boxed-view__box'>
                    <h1> Join Short Link </h1> 
                    { this.state.error ? <p>{ this.state.error }</p> : undefined}
                    <form className = 'boxed-view__form' onSubmit = { this.onSubmit } noValidate >
                        <input type = 'email'  ref = 'email' name = 'email' placeholder = 'Email '/>
                        <input type = 'password' ref = 'password' name = 'password' placeholder = 'Password '/>
                        <button className = 'button'> Create Account </button>
                    </form>
                    <Link to = '/' > Already have an account? Login </Link> 
                </div>        
            </div>
        );
    };
}
export default SignUp;