import Backbone from 'backbone';
import 'jquery-validation';

//----------------------------------------------------------

let View = Backbone.View.extend({

	initialize: function() {
		this.$loader = this.$el.find( '.loginModal__loader-wrap' );
		this.$errorContainer = this.$el.find( '#loginErrorContainer' );
		this.loaderActiveClass = 'loginModal__loader-wrap--active';
		this.ajaxAction = 'hyip_log';

		this.submitHandler = this.submitHandler.bind( this );
		this.ajaxSuccess = this.ajaxSuccess.bind( this );
		this.ajaxError = this.ajaxError.bind( this );

		this.setValidation();
	},

	setValidation: function() {
		this.$el.validate({
			submitHandler: this.submitHandler,
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

	submitHandler: function( form, event ) {
		this.$loader.addClass( this.loaderActiveClass );

		$.ajax({
			url: globalData.ajaxUrl,
			type: 'POST',
			dataType: 'json',
			data: 'action=' + this.ajaxAction + '&' + this.$el.serialize(),
			success: this.ajaxSuccess,
			error: this.ajaxError
		});
	},

	ajaxSuccess: function( data ) {
		this.$loader.removeClass( this.loaderActiveClass );
		
		if ( data.success ) {
			location.reload( true );
		} else {
			this.$errorContainer.html(
				'<li><label class-"loginModal__input--error">*' + data.data + '</label></li>'
			).css( 'display', 'block' );

		}
	},

	ajaxError: function( xhr, status, error ) {
		this.$loader.removeClass( this.loaderActiveClass );
		console.log( status );
		console.log( error );
	}

});

//-------------------------------------------------------

class LoginFormController {

	init() {
		let form = document.getElementsByClassName( 'loginModal__form' )[0];
		let view = new View({ el: form });
	}
}

export default LoginFormController;