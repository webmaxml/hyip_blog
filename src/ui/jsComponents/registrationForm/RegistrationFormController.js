import Backbone from 'backbone';
import 'jquery-validation';

if ( process.env.NODE_ENV === 'development' ) {
	let globalData = require( '../../../globalData' );
}

//----------------------------------------------------------

let View = Backbone.View.extend({

	initialize: function() {
		this.$loader = this.$el.find( '.regModal__loader-wrap' );

		let $loader = this.$loader;
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
						console.log( data );
					},
					error: function( xhr, status, error ) {
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

	constructor( domainFacade, login ) {
		this.domainFacade = domainFacade;
		this.login = login;
	}

	init() {
		if ( this.domainFacade.isUserRegistered() ) { return; }

		this.login.init();

		let form = document.getElementsByClassName( 'regModal__form' )[0];

		let view = new View({ el: form });

	}

}

export default RegistrationFormController;