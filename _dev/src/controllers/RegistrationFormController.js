import Backbone from 'backbone';

class RegistrationFormController {

	constructor( user, formView ) {
		_.extend( this, Backbone.Events );

		this.user = user;
		this.formView = formView;
	}

	init() {
		this.formView.init( this );

		this.listenTo( this.user, 'change:regStatus', this.handleStatusChange );
	}

	//------------------------------ View callbacks -------------------------------

	handleSubmit( form, event ) {
		let query = this.formView.getQuery();

		this.formView.showLoader();
		this.user.register( query );
	}

	//------------------------------ Model callbacks -------------------------------

	handleStatusChange( model, status ) {
		switch ( status ) {
			case 'pending':
				return;
			case 'success':
				location.reload( true );
				break;
			default:
				this.formView.hideLoader();
				this.formView.renderError( status );
				break;
		}
	}

}

export default RegistrationFormController;