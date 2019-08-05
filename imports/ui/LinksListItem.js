import React from 'react';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
class LinksListItem extends React.Component {
    state = {
        justCopied: false
    }
    componentDidMount () {
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            setTimeout(()=>{
                this.setState({ justCopied: false });     
            }, 1000)
        });
        this.clipboard.on('error',() => {
            alert('Unable to copy.Please copy it manually');
        })
    }
    componentWillUnmount () {
        this.clipboard.destroy();
    }
    handleClick = (_id, visible) =>{
        Meteor.call('links.setVisibility', _id, !visible)
    }
    renderStats = (visitedCount, lastVisitedAt) => {
        let momentNow = moment(lastVisitedAt);
        let visitedMessage = null;
        if (typeof(lastVisitedAt) === 'number') {
            visitedMessage = `(visited ${ momentNow.fromNow() })`   

        }
        const visitMessage = visitedCount === 1 ? 'visit' : 'visits';
        
        return ( <p className = 'item__message'>{ visitedCount } { visitMessage } - { visitedMessage }</p> ); 
    }
    render () {
        const { _id, url, shortUrl, visible , visitedCount, lastVisitedAt } = this.props; 
        return (
            <div className = 'item'>
                <h2 > { url } </h2>
                <p className = 'item__message'> { shortUrl } </p>
                { this.renderStats(visitedCount, lastVisitedAt) }
                <a className = 'button button--pill button--link' href = { shortUrl } target = '_blank' > Visit </a>
                <button className = 'button button--pill' ref = 'copy' data-clipboard-text = { shortUrl }> { this.state.justCopied ? 'Copied' : 'Copy' } </button>
                <button className = 'button button--pill' onClick = {() => { this.handleClick(_id, visible) }} >{ visible ? 'Hide' : 'Unhide' }</button>
            </div>
        );
    }
}

export default LinksListItem
