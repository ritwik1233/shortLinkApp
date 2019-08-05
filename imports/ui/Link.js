import React from 'react';
import LinkList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';
class Link extends React.Component {

    render () {
        return (
            <div>
                <PrivateHeader title = 'Short Link' />
                <div className = 'page-content'>
                    <LinksListFilters />
                    <AddLink />
                    <LinkList />
                </div>
            </div>
        )
    }
}
export default Link;