/* Arquivo: view.js
   Descrição: neste arquivo podem ser encontradas funções e inicializações JS/jQuery necessárias para o funcionamento do trabalho, definições de dados de templates e rotas, especificamente as de /view.
*/

import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import './main.html';
import './view.html';

// Definição das rotas para /view

Router.route('/view', function () {
	this.layout('common_layout');
	this.render('header', {
		to: "header"
	});
	this.render('view', {
		to: "main"
	});
	this.render('footer', {
		to: "footer"
	});
});

Template.view.helpers({
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

Template.view.events({
	'load .materialboxed': function (event) {
		$('.materialboxed').materialbox();
	},
});

// Inicializações dos componentes js
Template.view.onRendered(function () {
});