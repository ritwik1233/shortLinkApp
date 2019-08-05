import { Meteor } from 'meteor/meteor';
import { Links } from '../collections/links';
import SimplSchema from 'simpl-schema';
import shortid from 'shortid';
Meteor.methods({
  'links.insert': function (url) {
        if (!this.userId) {
            throw new Meteor.Error(' User not authorized ');
        }
        try {
         new SimplSchema({
            url: {
              type: String,
              regEx: SimplSchema.RegEx.Url
            }
          }).validate({ url });
          Links.insert({
              _id: shortid.generate(),
              url,
              userId: this.userId,
              visible: true,
              visitedCount: 0,
              lastVisitedAt: null
          })
        } catch (e) {
            throw new Meteor.Error (' Url is not valid ');
        }
        
  },
  'links.setVisibility': function (_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error(' User not authorized');
    }
    try {
      new SimplSchema({
        _id: {
          type: String,
          min: 1
        },
        visible: {
          type: Boolean
        }
        }).validate({
        _id,
        visible
      });
      Links.update(
        {
          _id,
          userId: this.userId
        }, 
        {
          $set: { visible } 
        }
      );
    } catch (e) {
      throw new Meteor.Error (' Update parameters incorrect ');
    }
  },
  'links.trackVisit': function(_id) {
    try {
      new SimplSchema({
        _id: {
          type: String,
          min: 1
        }
      }).validate({_id});
      Links.update({_id},
        {
         $set: { lastVisitedAt:new Date().getTime() },
         $inc: { visitedCount: 1 } 
        } 
      )
    } catch (e) {

    }
  }
})