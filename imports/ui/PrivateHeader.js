import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';
 
class PrivateHeader extends React.Component {
    state = {
        logout: Meteor.userId() ? false : true
    }
    logout = () => {
        Meteor.logout((err) => {
            if (err) {
                console.log(err);
            } else {
                this.setState({logout: true})
            }
        });
    }
    render() {
        if (this.state.logout) {
            return (
                <Redirect to = '/' />
            );
        }
        return (
            <div className = 'header'>
                <div className = 'header__content'>
                    <h1 className = 'header header--title '> { this.props.title } </h1>    
                    <button className = 'button button--link-text' onClick = { this.logout }> Logout</button>
                </div>
            </div>
        );
    }   
}
export default PrivateHeader;