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

Router.route('/view/:_id', function () {
	this.layout('common_layout');
	this.render('header', {
		to: "header"
	});
  this.render('view', {to: "main", data: function(){
        return Content.findOne({_id:this.params._id})}});
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
	answers: Answers.find({}, {
		sort: {
			created: -1
		}
	}),
	verify_answers: function(idcom) {
        c = Answers.findOne({_id:idcom});
        if (c != null && c.idmaterial == Router.current().params._id){
					// $('#no_comments').html('');
					return true;
				}
				// $('#no_comments').html('<p style="margin-left:10pt">Ainda não há comentários ou respostas para este material :(</p>');
        return false;
    },
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


Template.view.events({
	'click #remove_material': function (events) {
		var idMaterial = Router.current().params._id;
			// Removendo do banco os comentários/respostas daquele material
			Answers.find({idmaterial: idMaterial}).forEach(function (doc) {
				Answers.remove({_id: doc._id});
			});
			Content.remove({
				"_id": idMaterial
			});
		$(window).scrollTop(0);
		Router.go('\content');
	},

	'click #remove_answer': function (events) {
		var idAnswer = this._id;
			Answers.remove({
				"_id": idAnswer
			});
	},

	'load .materialboxed': function (event) {
		$('.materialboxed').materialbox();
	},

	'click .fr-element.fr-view': function (events) {
			$('#answer_error').text("");
	},

	'submit #form_newAnswer': function (events) {
		function checkAnswer() {
			var state = true;
			if ($('#answer').val() == "") {
				$('#answer_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#answer_error').text("");
				state = true;
			}
			return state;
		}

		var answer= checkAnswer();

		// É verdadeiro somente se nenhuma verificação foi falha
		if (answer) {
			var answer_value = $("#answer").val();
			Answers.insert({
        idmaterial: Router.current().params._id,
				answer: answer_value,
				created: new Date(),
				createdBy: Meteor.user()._id
			});
			// Confirmação de envio
			swal({
				  title: "Resposta/comentário enviado com sucesso!",
				  type: "success",
				  confirmButtonColor: "#ffb300",
				  confirmButtonText: "Fechar",
				  closeOnConfirm: true
				},
				function(){
					// Limpando o editor do Froala e dando refresh no placeholder
					$('.fr-element.fr-view').html("");
					$('textarea#answer').froalaEditor('placeholder.refresh');
			});
			return false;
		}  else {
			return false;
		}
	},
});
