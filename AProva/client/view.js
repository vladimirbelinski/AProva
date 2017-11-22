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
	// Criar função onChanged para froala
	'submit #form_newAnswer': function (events) {		
		function checkMaterial() {
			var state = true;
			if ($('#material').val() == '') {
				$('#material_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#material_error').text("");
				state = true;
			}
			return state;
		}
		
		var material= checkMaterial();

		// É verdadeiro somente se nenhuma verificação foi falha
		if (material) {
			var material_value = $("#material").val();
			Answers.insert({
				// Add id do material
				material: material_value,
				created: new Date(),
				createdBy: Meteor.user()._id
			});
			// Confirmação de envio
			swal({
				  title: "Comentário/resposta enviada com sucesso!",
				  type: "success",
				  confirmButtonColor: "#ffb300",
				  confirmButtonText: "Fechar",
				  closeOnConfirm: true
				},
				function(){
				  // Limpar froala após envio
			});
			return false;
		}  else {
			return false;
		}
	},
});

// Inicializações dos componentes js
Template.view.onRendered(function () {
});