import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Links } from '../api/collections/links';
import FlipMove from 'react-flip-move';

import LinksListItem from './LinksListItem';
class LinksList extends React.Component {
    state = {
        links: [],
    }

    componentDidMount () {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({visible: Session.get('showVisible')}).fetch();
            this.setState({ links });
        })
    }

    componentWillUnmount () {
        this.linksTracker.stop();
    }
   
    renderLinks = (links) => {
        if (links.length > 0) {
            return links.map(eachData => {
                const shortUrl = Meteor.absoluteUrl(eachData._id);
                return (
                    <LinksListItem key = { eachData._id } shortUrl = { shortUrl } { ...eachData } />
                );
            })
        } else {
            return (
                <div className = 'item'>
                    <p className = 'item__status-message'> No links found </p>
                </div>
            );
        }
        
    }

    render () {
        return (
            <div >
                <FlipMove maintainContainerHeight = { true } >
                    { this.renderLinks(this.state.links) }
                </FlipMove>
            </div>
        );
    };
}
export default LinksList;