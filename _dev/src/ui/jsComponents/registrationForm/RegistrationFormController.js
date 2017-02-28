import Backbone from 'backbone';
import 'jquery-validation';

//----------------------------------------------------------

let View = Backbone.View.extend({

	initialize: function() {
		this.$loader = this.$el.find( '.regModal__loader-wrap' );
		this.$errorContainer = this.$el.find( '#responseErrorContainer' );

		let $loader = this.$loader;
		let $errorContainer = this.$errorContainer;
		let loaderActiveClass = 'regModal__loader-wrap--active';

		this.$el.validate({
			submitHandler: function( form, event ) {
				$loader.addClass( loaderActiveClass );

				$.ajax({
					url: globalData.ajaxUrl,
					type: 'POST',
					dataType: 'json',
					data: 'action=hyip_reg&' + $( form ).serialize(),
					success: function( data ) {
						$loader.removeClass( loaderActiveClass );
						
						// we get redirect url with success reg
						// and error string with error
						if ( data.success ) {
							window.location.href = data.data;
						} else {
							console.log( data.data );
							$errorContainer.text( data.data );
						}
					},
					error: function( xhr, status, error ) {
						$loader.removeClass( loaderActiveClass );
						console.log( status );
						console.log( error );
					}
				});
			},
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
					minlength: 8
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

});

//-------------------------------------------------------

class RegistrationFormController {

	constructor( domainFacade ) {
		this.domainFacade = domainFacade;
	}

	init() {
		if ( this.domainFacade.isUserRegistered() ) { return; }

		let form = document.getElementsByClassName( 'regModal__form' )[0];

		let view = new View({ el: form });

	}

}

export default RegistrationFormController;