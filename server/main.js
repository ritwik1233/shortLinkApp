import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/utils/users';
import '../imports/api/methods/methods';
import '../imports/api/publications/publications';
import { Links } from '../imports/api/collections/links';

Meteor.startup(() => { 
    WebApp.connectHandlers.use((req, res, next) => {
        const _id = req.url.slice(1);
        const link = Links.findOne({ _id });
        if (link) {
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();
            Meteor.call('links.trackVisit', _id);
        } else {
            next();
        }
       
    });
});

