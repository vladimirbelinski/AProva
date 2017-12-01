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
	content: Content.find({}, {
		sort: {
			created: -1
		}
	}),
	getName: function (user_id) {
		var user = Meteor.users.findOne({
			_id: user_id
		});
		return user.username;
	},
	verify_user: function (user_id) {
		var user = Meteor.users.findOne({
			_id: user_id
		});
		var userM = Meteor.user();
		if (user && userM) {
			if (userM.username != "undefined" && user.username != "undefined") {
				if (userM.username == user.username) return true;
			}
			else if (userM.profile.name != "undefined" && user.prfile.name != "undefined") {
				if (userM.profile.name == user.profile.name) return true;
			}
		}
		return false;
	},
});

// Eventos do template content
Template.content.events({
	'click #remove_material': function (events) {
		var idMaterial = this._id;
			// Removendo do banco os comentários/respostas daquele material
			Answers.find({idmaterial: idMaterial}).forEach(function (doc) {
				Answers.remove({_id: doc._id});
			});
			Content.remove({
				"_id": idMaterial
			});
	},
	
	'change #year': function (events) {
		var pattYear = new RegExp("^[1-2]{1}[0-9]{3}$");

		if (($('#year').val() != "") && !(pattYear.test($('#year').val()))) {
			$('#year').addClass('invalid');
			$('#year_error').text("Ano em formato inválido.");
		} else {
			$('#year').removeClass('invalid');
			$('#year').addClass('valid');
			$('#year_error').text("");
		}
	},
	'change #semester': function (events) {
		var pattSemester = new RegExp("^[1-4]{1}$");

		if (($('#semester').val() != "") && !(pattSemester.test($('#semester').val()))) {
			$('#semester').addClass('invalid');
			$('#semester_error').text("(Bi/Se)mestre em formato inválido.");
		} else {
			$('#semester').removeClass('invalid');
			$('#semester').addClass('valid');
			$('#semester_error').text("");
		}
	},
	'submit #form_searchContent': function (events) {		
		function checkYear() {
		var pattYear = new RegExp("^[1-2]{1}[0-9]{3}$");
		var state = true;

		if (($('#year').val() != "") && !(pattYear.test($('#year').val()))) {
			$('#year').addClass('invalid');
			$('#year_error').text("Ano em formato inválido.");
			state = false;
		} else {
			$('#year').removeClass('invalid');
			$('#year').addClass('valid');
			$('#year_error').text("");
			state = true;
		}
		return state;
		}
		
		function checkSemester() {
		var pattSemester = new RegExp("^[1-4]{1}$");
		var state = true;

		if (($('#semester').val() != "") && !(pattSemester.test($('#semester').val()))) {
			$('#semester').addClass('invalid');
			$('#semester_error').text("(Bi/Se)mestre em formato inválido.");
			state = false;
		} else {
			$('#semester').removeClass('invalid');
			$('#semester').addClass('valid');
			$('#semester_error').text("");
			state = true;
		}
		return state;
		}
		
		var year= checkYear();
		var semester= checkSemester();

		// É verdadeiro somente se nenhuma verificação foi falha
		if (year && semester) {
			// Scrollando a tela para a posição onde são apresentados os resultados da busca
			$(window).scrollTop(500);
		  // Limpando os campos após o envio
			$("#inst, #course, #subject, #topic, #professor, #year, #semester").val("");
			// Removendo a classe valid
			$("#inst, #course, #subject, #topic, #professor, #year, #semester").removeClass("valid");
			return false;
		}  else {
			return false;
		}
	},
});