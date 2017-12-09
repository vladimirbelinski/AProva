/* Arquivo: main.js
   Descrição:neste arquivo podem ser encontradas funções e inicializações JS/jQuery necessárias para o funcionamento do trabalho, definições de dados de templates e rotas, especificamente àquelas relacionadas à 'main.html'.
*/

import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import './main.html';

// Redirecionamento para \index se usuário não está logado
var OnBeforeActions;

OnBeforeActions = {
	loginRequired: function (pause) {
		if (!Meteor.userId() && !Meteor.loggingIn()) {
			this.redirect('\index');
			this.stop();
		} else {
			this.next();
		}
	}
};

Router.onBeforeAction(OnBeforeActions.loginRequired, {
	only: ['registrar']
});

// Inicializações dos componentes js
Template.header.onRendered(function () {
	// Inicialização do sideNav (para o menu reduzido)
	$('.button-collapse').sideNav();
	// $("#login-sign-in-link").replaceWith("<a class=\"login-link-text\" id=\"login-sign-in-link\">Entrar</a>");
});

Template.header.helpers({
	isLoginServicesConfigured() {
		return Accounts.loginServicesConfigured();
	}
});

Template.header.events({
	'click #materialLinks': function (events) {
		Meteor.setTimeout(function () {
			$("#busca").click();
		},800);
		Meteor.setTimeout(function () {
			$(window).scrollTop(0);
		},800);
	},
	'click .login-facebook': function (e) {
		e.preventDefault();
		Meteor.loginWithFacebook({
			requestPermissions: ['public_profile', 'email']
		}, function (err) {
			if (err) {
				console.log('Handle errors here: ', err);
			}
		});
	},
	'click [data-action=fb-login]' (e, tmpl) {
		e.preventDefault();
		Meteor.loginWithFacebook({
			requestPermissions: ['public_profile', 'email']
		});
	},
	'click [data-action=logout]' (e, tmpl) {
		e.preventDefault();
		Meteor.logout();
	},
});
