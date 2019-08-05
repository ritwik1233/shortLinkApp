import { Meteor } from "meteor/meteor";
import { Links } from '../collections/links';

if (Meteor.isServer) {
    Meteor.publish('links', function () {
        return Links.find({ userId: this.userId });
    });
}