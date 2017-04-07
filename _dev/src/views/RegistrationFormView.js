import Backbone from 'backbone';
import 'jquery-validation';

let RegistrationFormView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'regModal__form' )[0];
		this.$el = $( this.el );
		this.$button = this.$el.find( '.regModal__submit' );
		this.$errorContainer = this.$el.find( '#regErrorContainer' );

		this.setValidation();
	},

	setValidation: function() {
		this.$el.validate({
			submitHandler: ( form, event ) => this.handleSubmit( form, event ),
			rules: {
				login: {
					required: true,
					minlength: 3
				},
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 6
				},
				password_repeat: {
					required: true,
					equalTo: '#regPwd'
				}
			},
			errorClass: 'regModal__input--error',
			validClass: 'regModal__input--valid',
			messages: {
				login: {
					required: '*Поле логина является обязательным',
					minlength: jQuery.validator.format( '*Длина логина должна быть минимум {0} символа' )
				},
				email: {
					required: '*Поле email является обязательным',
					email: '*Некорректный email'
					
				},
				password: {
					required: '*Поле пароля является обязательным',
					minlength: jQuery.validator.format( '*Длина пароля должна быть минимум {0} символов' )		
				},
				password_repeat: {
					required: '*Необходимо повторить пароль',
					equalTo: '*Пароли не совпадают'		
				}
			},
			errorLabelContainer: '#regErrorContainer',
			wrapper: 'li'
		});
	},

	handleSubmit: function( form, event ) { 
		this.controller.handleSubmit( form, event ); 
	},

	showLoader: function() {
		this.$button.addClass( 'regModal__submit--loading' );
	},

	hideLoader: function() {
		this.$button.removeClass( 'regModal__submit--loading' );
	},

	getQuery: function() {
		return this.$el.serialize();
	},

	renderError: function( error ) {
		this.$errorContainer.html(
			'<li><label class="regModal__input--error">*' + error + '</label></li>'
		).css( 'display', 'block' );
	}

});


export default RegistrationFormView;