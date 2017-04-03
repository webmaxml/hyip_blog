import Backbone from 'backbone';

class ProfitCalcDepositController {

	constructor( deposit, depositView ) {
		_.extend( this, Backbone.Events );

		this.deposit = deposit;
		this.depositView = depositView;
	}

	init() {
		this.depositView.init( this );

		this.listenTo( this.deposit, 'change:value', this.setInputValue );
		this.listenTo( this.deposit, 'invalid', this.setError );
	}

	//------------------------------ View callbacks -------------------------------

	handleChange( event ) {
		this.deposit.set( { value: +event.target.value }, { validate: true } );
	}

	//------------------------------ Model callbacks -------------------------------

	setInputValue( model, value ) {
		this.depositView.render( value );
	}

	setError( model, error ) {
		this.depositView.renderError( error );
	}

}

export default ProfitCalcDepositController;