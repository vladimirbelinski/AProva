import {
	Mongo
} from 'meteor/mongo';

Content = new Mongo.Collection("Content");
ContentFilter = new Mongo.Collection(null);
Answers = new Mongo.Collection("Answers");
