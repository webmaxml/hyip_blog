import Backbone from 'backbone';
import 'tooltipster';

let Model = Backbone.Model.extend({

	defaults: {
		value: null
	},

	validate: function( attrs ) {
		let isNotEmpty = attrs.value.length > 0;
		let isTooShort = isNotEmpty && attrs.value.length <= 3; 
	}	

});

//----------------------------------------------------------

let View = Backbone.View.extend({

	events: {
		input: 'changeHandler'
	},

	initialize: function( options ) {
		this.$tooltip = this.$el.tooltipster({
			theme: 'tooltipster-borderless',
			side: 'top',
			trigger: 'custom',
			maxWidth: 200,
			distance: 20
		});
	},

	changeHandler: _.debounce( function( e ) {
		this.model.set( { value: this.$el.val() }, { validate: true } );
	}, 600 ),


});

//-------------------------------------------------------

class RegistrationLoginController {

	init() {
		// let login = document.getElementById( 'regLogin' );

		// let model = new Model();
		// let view = new View({ el: login, model });

	}

}

export default RegistrationLoginController;