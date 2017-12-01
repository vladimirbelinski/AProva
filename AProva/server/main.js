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
    appId: '456943368001102',
    secret: '3b5cf3adc9c0c9ef3b0a37f607eeecb8'
});

//ServiceConfiguration.configurations.insert({
//    service: "facebook",
//    appId: '1936887573232222',
//    secret: '554eebd2a04bd63e9f764a5f1fa0d910'
//});

Accounts.onCreateUser(function (options, user) {

    if (!user.services.facebook) {
        return user;
    }
    user.username = user.services.facebook.name;
    user.emails = [{address: user.services.facebook.email}];

    return user;
});
