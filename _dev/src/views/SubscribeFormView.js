import Backbone from 'backbone';
import 'jquery-validation';

let SubscribeFormView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'subscribe__form' )[0];
		this.$el = $( this.el );
		this.$button = this.$el.find( '.subscribe__submit' );
		this.$errorContainer = this.$el.find( '#subscribe-error' );

		this.setValidation();
	},

	setValidation: function() {
		this.$el.validate({
			submitHandler: ( form, event ) => {
				this.handleSubmit( form, event );
			},
			rules: {
				name: {
					required: true,
					minlength: 3
				},
				email: {
					required: true,
					email: true
				}
			},
			errorClass: 'subscribe__input--error',
			validClass: 'subscribe__input--valid',
			messages: {
				name: {
					required: '*Поле имени является обязательным',
					minlength: jQuery.validator.format( '*Длина имени должна быть минимум {0} символа' )
				},
				email: {
					required: '*Поле email является обязательным',
					email: '*Некорректный email'
				},
			},
			errorLabelContainer: '#subscribe-error',
			wrapper: 'li'
		});
	},

	handleSubmit: function( form, event ) { 
		this.controller.handleSubmit( form, event ); 
	},

	showLoader: function() {
		this.$button.addClass( 'subscribe__submit--loading' );
	},

	hideLoader: function() {
		this.$button.removeClass( 'subscribe__submit--loading' );
	},

	getQuery: function() {
		return this.$el.serialize();
	},

	renderError: function( error ) {
		this.$errorContainer.html(
			'<li><label>*' + error + '</label></li>'
		).css( 'display', 'block' );
	},

	renderSuccess: function( text ) {
		this.$errorContainer.html(
			'<li><label class="subscribe__error--success">' + text + '</label></li>'
		).css( 'display', 'block' );
	}

});


export default SubscribeFormView;