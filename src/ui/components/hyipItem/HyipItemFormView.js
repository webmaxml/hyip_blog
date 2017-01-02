import Backbone from 'backbone';

let HyipItemFormView = Backbone.View.extend({

	events: {
		submit: 'submitHandler'
	},

	initialize: function() {
		this.listenTo( this.model, 'invalid', this.handleError );
	},

	submitHandler: function( e ) {
		e.preventDefault();

		let serialString = this.$el.serialize();
		let array = serialString.split( '&' ); 

		let data = {};

		array.forEach( function( keyValue ) {
			let keyValueArray = keyValue.split( '=' );
			let key = keyValueArray[0];
			let value = keyValueArray[1];

			data[ key ] = value;
		});

		this.model.set({ formData: data }, { validate: true });
	},

	handleError: function( model, error ) {
		console.log( error );
	}

});

export default HyipItemFormView;