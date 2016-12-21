import Backbone from 'backbone';

let WindowView = Backbone.View.extend({

	events: {
		scroll: 'changeButtonVisibility'
	},

	changeButtonVisibility: _.throttle( function( e ) {

		if ( window.pageYOffset > 500 ) {
			this.model.set({ visible: true });
		} else {
			this.model.set({ visible: false });
		}

		return this;

	}, 500 )

});

export default WindowView;