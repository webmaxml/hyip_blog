import Backbone from 'backbone';

let FormView = Backbone.View.extend({

	events: {
		submit: 'submitHandler'
	},

	initialize: function( attrs ) {
		this.controller = attrs.controller
	},

	submitHandler: function( e ) {
		e.preventDefault();
		this.controller.submitForm();
	},

});

//----------------------------------------------------------------

class ProfitFormController {

	constructor( select, input, checkbox ) {
		_.extend( this, Backbone.Events );

		this.select = select;
		this.input = input;
		this.checkbox = checkbox;
		this.parent = null;
	}

	setParent( parent ) {
		this.parent = parent;
	}

	init() {
		this.select.setParent( this );

		this.select.init();
		this.input.init();
		this.checkbox.init();

		let el = document.getElementsByClassName( 'hyipItemProfit__form' )[0];
		this.view = new FormView({ el, controller: this });
	}

	setOptions( plans ) {
		this.select.setOptions( plans )
	}

	resetActiveValues( plan ) {
		this.input.setValues( plan );
		this.checkbox.setValues( plan );
	}

	setActiveValues( plan, deposit ) {
		this.select.setActivePlan( plan )
		this.input.setValue( deposit );
	}

	submitForm() {
		let activePlan = this.select.getActivePlan();
		let deposit = this.input.getValue();
		let refback = this.checkbox.getValue();

		this.parent.setModule( activePlan, deposit, refback );
	}

}

export default ProfitFormController;