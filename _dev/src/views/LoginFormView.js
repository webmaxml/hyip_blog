import Backbone from 'backbone';
import 'jquery-validation';

let LoginFormView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'loginModal__form' )[0];
		this.$el = $( this.el );
		this.$button = this.$el.find( '.loginModal__submit' );
		this.$errorContainer = this.$el.find( '#loginErrorContainer' );

		this.setValidation();
	},

	setValidation: function() {
		this.$el.validate({
			submitHandler: ( form, event ) => {
				this.handleSubmit( form, event );
			},
			rules: {
				login: {
					required: true,
					minlength: 3
				},
				password: {
					required: true,
					minlength: 6
				}
			},
			errorClass: 'loginModal__input--error',
			validClass: 'loginModal__input--valid',
			messages: {
				login: {
					required: '*Поле логина является обязательным',
					minlength: jQuery.validator.format( '*Длина логина должна быть минимум {0} символа' )
				},
				password: {
					required: '*Поле пароля является обязательным',
					minlength: jQuery.validator.format( '*Длина пароля должна быть минимум {0} символов' )		
				}
			},
			errorLabelContainer: '#loginErrorContainer',
			wrapper: 'li'
		});
	},

	handleSubmit: function( form, event ) { 
		this.controller.handleSubmit( form, event ); 
	},

	showLoader: function() {
		this.$button.addClass( 'loginModal__submit--loading' );
	},

	hideLoader: function() {
		this.$button.removeClass( 'loginModal__submit--loading' );
	},

	getQuery: function() {
		return this.$el.serialize();
	},

	renderError: function( error ) {
		this.$errorContainer.html(
			'<li><label class="loginModal__input--error">*' + error + '</label></li>'
		).css( 'display', 'block' );
	}

});


export default LoginFormView;