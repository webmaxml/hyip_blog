import Backbone from 'backbone';

class ProfitCalcRefbackController {

	constructor( refback, refbackView ) {
		_.extend( this, Backbone.Events );

		this.refback = refback;
		this.refbackView = refbackView;
	}

	init() {
		this.refbackView.init( this );

		this.listenTo( this.refback, 'change:disabled', this.setDisabling );
		this.listenTo( this.refback, 'change:value', this.setValue );
	}

	//------------------------------ View callbacks -------------------------------

	handleChange( event ) {
		this.refback.toggleValue();
	}

	//------------------------------ Model callbacks -------------------------------

	setDisabling( model, disabled ) {
		if ( disabled ) {
			this.refbackView.disable();
		} else {
			this.refbackView.enable();
		}
	}

	setValue( model, value ) {
		this.refbackView.render( value );
	}

}

export default ProfitCalcRefbackController;