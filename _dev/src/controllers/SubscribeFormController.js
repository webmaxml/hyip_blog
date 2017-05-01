import Backbone from 'backbone';

class SubscribeFormController {

	constructor( subscribe, formView ) {
		_.extend( this, Backbone.Events );

		this.subscribe = subscribe;
		this.formView = formView;
	}

	init() {
		this.formView.init( this );

		this.listenTo( this.subscribe, 'change:loading', this.setLoading );
		this.listenTo( this.subscribe, 'change:error', this.setError );
		this.listenTo( this.subscribe, 'change:success', this.setSuccess );
	}

	//------------------------------ View callbacks -------------------------------

	handleSubmit( form, event ) {
		let query = this.formView.getQuery();
		this.subscribe.subscribe( query );
	}

	//------------------------------ Model callbacks -------------------------------

	setLoading( model, loading ) {
		if ( loading ) {
			this.formView.showLoader();
		} else {
			this.formView.hideLoader();
		}
	}

	setError( model, error ) {
		if ( !error ) { return; }

		this.formView.renderError( error );
	}

	setSuccess( model, text ) {
		if ( !text ) { return; }

		this.formView.renderSuccess( text );
	}

}

export default SubscribeFormController;