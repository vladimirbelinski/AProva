/* Arquivo: registrar.js
   Descrição: neste arquivo podem ser encontradas funções e inicializações JS/jQuery necessárias para o funcionamento do trabalho, definições de dados de templates e rotas,especificamente as de /registrar.
*/

import {
	Template
} from 'meteor/templating';
import {
	ReactiveVar
} from 'meteor/reactive-var';
import './main.html';
import './registrar.html';

// Definição das rotas para /registrar

Router.route('/registrar', function () {
	this.layout('common_layout');
	this.render('header', {
		to: "header"
	});
	this.render('registrar', {
		to: "main"
	});
	this.render('footer', {
		to: "footer"
	});
});

// Inicializações dos componentes js
Template.registrar.onRendered(function () {
    $('textarea#pergunta').froalaEditor();
});
