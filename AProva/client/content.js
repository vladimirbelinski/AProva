/* Arquivo: content.js
   Descrição: neste arquivo podem ser encontradas funções e inicializações JS/jQuery necessárias para o funcionamento do trabalho, definições de dados de templates e rotas, especificamente as de /content.
*/

import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import './main.html';
import './content.html';

// Definição das rotas para /content

Router.route('/content', function () {
	this.layout('common_layout');
	this.render('header', {
		to: "header"
	});
	this.render('content', {
		to: "main"
	});
	this.render('footer', {
		to: "footer"
	});
});

Template.content.helpers({
	usuario: function () {
		if (Meteor.user()) {
			if (Meteor.user().username) {
				return ", " + Meteor.user().username;
			} else if (Meteor.user().profile.name) {
				return ", " + Meteor.user().profile.name;
			}
		}
	},
});