import Backbone from 'backbone';

let ModalTriggerView = Backbone.View.extend({

	events: {
		click: 'handleClick'
	},

	handleClick: function( e ) { this.controller.handleClick( e ); },

	init: function( controller ) {
		this.controller = controller;
	},

});

export default ModalTriggerView;