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

Template.registrar.helpers({
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

// Inicializações dos componentes js
Template.registrar.onRendered(function () {
	$('textarea#material').froalaEditor({placeholderText: 'Insira aqui o material que deseja registrar'})
    $('textarea#material').froalaEditor();
});

// Eventos do template registrar
Template.registrar.events({
	'change #inst': function (events) {
		if ($('#inst').val() == "") {
			$('#inst').addClass('invalid');
			$('#inst_error').text("Preenchimento obrigatório");
		} else {
			$('#inst').removeClass('invalid');
			$('#inst').addClass('valid');
			$('#inst_error').text("");
		}
	},
	'change #course': function (events) {
		if ($('#course').val() == "") {
			$('#course').addClass('invalid');
			$('#course_error').text("Preenchimento obrigatório");
		} else {
			$('#course').removeClass('invalid');
			$('#course').addClass('valid');
			$('#course_error').text("");
		}
	},
	'change #subject': function (events) {
		if ($('#subject').val() == "") {
			$('#subject').addClass('invalid');
			$('#subject_error').text("Preenchimento obrigatório");
		} else {
			$('#subject').removeClass('invalid');
			$('#subject').addClass('valid');
			$('#subject_error').text("");
		}
	},
	'change #topic': function (events) {
		if ($('#topic').val() == "") {
			$('#topic').addClass('invalid');
			$('#topic_error').text("Preenchimento obrigatório");
		} else {
			$('#topic').removeClass('invalid');
			$('#topic').addClass('valid');
			$('#topic_error').text("");
		}
	},
	'change #professor': function (events) {
		if ($('#professor').val() == "") {
			$('#professor').addClass('invalid');
			$('#professor_error').text("Preenchimento obrigatório");
		} else {
			$('#professor').removeClass('invalid');
			$('#professor').addClass('valid');
			$('#professor_error').text("");
		}
	},
	'change #year': function (events) {
		var pattYear = new RegExp("^[1-2]{1}[0-9]{3}$");

		if (($('#year').val() != "") && !(pattYear.test($('#year').val()))) {
			$('#year').addClass('invalid');
			$('#year_error').text("Ano em formato inválido.");
		} else if ($('#year').val() == "") {
			$('#year').addClass('invalid');
			$('#year_error').text("Preenchimento obrigatório");
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
		} else if ($('#semester').val() == "") {
			$('#semester').addClass('invalid');
			$('#semester_error').text("Preenchimento obrigatório");
		} else {
			$('#semester').removeClass('invalid');
			$('#semester').addClass('valid');
			$('#semester_error').text("");
		}
	},
	'change #title': function (events) {
		if ($('#title').val() == "") {
			$('#title').addClass('invalid');
			$('#title_error').text("Preenchimento obrigatório");
		} else {
			$('#title').removeClass('invalid');
			$('#title').addClass('valid');
			$('#title_error').text("");
		}
	},
	'click .fr-element.fr-view': function (events) {
			$('#material_error').text("");
	},
	'submit #form_newContent': function (events) {
		function checkInst() {
			var state = true;
			if ($('#inst').val() == "") {
				$('#inst').addClass('invalid');
				$('#inst_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#inst').removeClass('invalid');
				$('#inst').addClass('valid');
				$('#inst_error').text("");
				state = true;
			}
			return state;
		}
		
		function checkCourse() {
			var state = true;
			if ($('#course').val() == "") {
				$('#course').addClass('invalid');
				$('#course_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#course').removeClass('invalid');
				$('#course').addClass('valid');
				$('#course_error').text("");
				state = true;
			}
			return state;
		}
		
		function checkSubject() {
			var state = true;
			if ($('#subject').val() == "") {
				$('#subject').addClass('invalid');
				$('#subject_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#subject').removeClass('invalid');
				$('#subject').addClass('valid');
				$('#subject_error').text("");
				state = true;
			}
			return state;
		}
		
		function checkTopic() {
			var state = true;
			if ($('#topic').val() == "") {
				$('#topic').addClass('invalid');
				$('#topic_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#topic').removeClass('invalid');
				$('#topic').addClass('valid');
				$('#topic_error').text("");
				state = true;
			}
			return state;
		}
		
		function checkProfessor() {
			var state = true;
			if ($('#professor').val() == "") {
				$('#professor').addClass('invalid');
				$('#professor_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#professor').removeClass('invalid');
				$('#professor').addClass('valid');
				$('#professor_error').text("");
				state = true;
			}
			return state;
		}
		
		function checkYear() {
		var pattYear = new RegExp("^[1-2]{1}[0-9]{3}$");
		var state = true;

		if (($('#year').val() != "") && !(pattYear.test($('#year').val()))) {
			$('#year').addClass('invalid');
			$('#year_error').text("Ano em formato inválido.");
			state = false;
		} else if ($('#year').val() == "") {
			$('#year').addClass('invalid');
			$('#year_error').text("Preenchimento obrigatório");
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
		} else if ($('#semester').val() == "") {
			$('#semester').addClass('invalid');
			$('#semester_error').text("Preenchimento obrigatório");
			state = false;
		} else {
			$('#semester').removeClass('invalid');
			$('#semester').addClass('valid');
			$('#semester_error').text("");
			state = true;
		}
		return state;
		}
		
		function checkTitle() {
			var state = true;
			if ($('#title').val() == "") {
				$('#title').addClass('invalid');
				$('#title_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#title').removeClass('invalid');
				$('#title').addClass('valid');
				$('#title_error').text("");
				state = true;
			}
			return state;
		}
		
		function checkMaterial() {
			var state = true;
			// console.log($('#material').val());
			if ($('#material').val() == "") {
				$('#material_error').text("Preenchimento obrigatório");
				state = false;
			} else {
				$('#material_error').text("");
				state = true;
			}
			return state;
		}
		
		var inst = checkInst();
		var course = checkCourse();
		var subject = checkSubject();
		var topic= checkTopic();
		var professor= checkProfessor();
		var year= checkYear();
		var semester= checkSemester();
		var title= checkTitle();
		var material= checkMaterial();

		// É verdadeiro somente se nenhuma verificação foi falha
		if (inst && course && subject && topic && professor && year && semester && title && material) {
			var inst_value = $("#inst").val();
			var course_value = $("#course").val();
			var subject_value = $("#subject").val();
			var topic_value = $("#topic").val();
			var professor_value = $("#professor").val();
			var year_value = $("#year").val();
			var semester_value = $("#semester").val();
			var title_value = $("#title").val();
			var material_value = $("#material").val();
			Content.insert({
				inst: inst_value,
				course: course_value,
				subject: subject_value,
				topic: topic_value,
				professor: professor_value,
				year: year_value,
				semester: semester_value,
				title: title_value,
				material: material_value,
				created: new Date(),
				createdBy: Meteor.user()._id
			});
			// Confirmação de envio
			swal({
				  title: "Material enviado com sucesso!",
				  type: "success",
				  confirmButtonColor: "#ffb300",
				  confirmButtonText: "Fechar",
				  closeOnConfirm: true
				},
				function(){
				  // Limpando os campos após o envio
				  $("#inst, #course, #subject, #topic, #professor, #year, #semester, #title").val("");
					// Limpando o editor do Froala e dando refresh no placeholder
					$('.fr-element.fr-view').html("");
					// $('textarea#material').data('froala.editor').opts.placeholderText = 'Insira aqui o material que deseja registrar';
					$('textarea#material').froalaEditor('placeholder.refresh');
				  // Removendo a classe valid
				  $("#inst, #course, #subject, #topic, #professor, #year, #semester, #title").removeClass("valid");
			});
			return false;
		}  else {
			return false;
		}
	},
});

