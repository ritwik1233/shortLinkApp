import { Accounts } from 'meteor/accounts-base';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

Accounts.validateNewUser((user) => {
    const email = user.emails[0].address;
    try {
      new SimpleSchema({
        email: {
          type: String,
          regEx: SimpleSchema.RegEx.EmailWithTLD
        }
      }).validate({
        email
      });
    } catch (e) {
      throw new Meteor.Error(400, e.message);
    } 
    return true;
});