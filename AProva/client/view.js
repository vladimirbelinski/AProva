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
    //assistir.find({"email":Meteor.user().emails[0].address});
    answers: Answers.find({}, {
        sort: {
			created: -1
		}
    }),
	verify_answers: function(idcom) {
        c = Answers.findOne({_id:idcom});
        console.log(idcom);
        console.log(c);
        if (c != null && c.idmaterial == Router.current().params._id) return true;
        return false;
    },
	getName: function (user_id) {
		var user = Meteor.users.findOne({
			_id: user_id
		});
		return user.username;
	},
	// TODO: aqui precisamos retornar o conteúdo com o ID da URL
	 //data: Content.find({_id:{$eq:'nXEfiS4Kk9t2Kesji'}}, {}),
});


Template.view.events({
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
				// Add id do material
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