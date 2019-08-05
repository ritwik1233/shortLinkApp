import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

class AddLink extends React.Component {
    state = {
        url: '',
        isOpen: false,
        error: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const url = this.state.url;
        Meteor.call('links.insert', url, (err, result) => {
                if (err) {
                    console.log(err.error);
                    this.setState({ error: err.error })
                } else {
                    this.setState({ url: '' , error: '', isOpen: false});
                }
        }); 
    }
    handleChange = (e) => {
        this.setState({ url: e.target.value.trim() });
    }
    handleAddLink = () => {
        this.setState({ isOpen: true });
    }
    handleCancel = () => {
        this.setState({ 
            isOpen: false,
            url: '',
            error: ''
        });
    }
    onAfterOpen = () => {
        this.refs.url.focus();
    }

    render () {
        return (
            <div>
                <button className = 'button' onClick = { this.handleAddLink } >+ Add Link </button>
                <Modal 
                 isOpen = { this.state.isOpen }
                 contentLabel = 'Add Link'
                 ariaHideApp = { false }
                 onAfterOpen = { this.onAfterOpen }
                 onRequestClose = { this.handleCancel }
                 className = 'boxed-view__box '
                 overlayClassName = 'boxed-view boxed-view--modal'
                >
                    <h1> Add Link </h1>
                    { this.state.error ? <p> { this.state.error } </p> : undefined }
                    <form className = 'boxed-view__form' onSubmit = { this.handleSubmit }>
                        <input 
                            type = 'text' 
                            onChange = { this.handleChange } 
                            value = { this.state.url } 
                            placeholder = 'URL'
                            ref = 'url'
                            />
                        <button className = 'button'> Add Link </button>
                        <button  type = 'button' className = 'button button--secondary' onClick = { this.handleCancel } > Cancel </button>
                    </form>
                </Modal>
            </div>
        );
    }
}
export default AddLink;