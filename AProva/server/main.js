import {
	Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
	// Code to run on server at startup
});

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '221359355068459',
    secret: '5bf4074989f98b6ce5530751fff39d9d'
});

Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook) {
        return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];

    return user;
});
