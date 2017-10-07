/* Arquivo: main.js
   Descrição:
*/

import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import './main.html';

// Configuração de accounts para aceitar username e email
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_EMAIL"
});

// Inicializações dos componentes js
Template.header.onRendered(function () {
	// Inicialização do sideNav (para o menu reduzido)
	$('.button-collapse').sideNav();
	// $("#login-sign-in-link").replaceWith("<a class=\"login-link-text\" id=\"login-sign-in-link\">Entrar</a>");
});
