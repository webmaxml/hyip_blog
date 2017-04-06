import Backbone from 'backbone';

let UpButton = Backbone.Model.extend({

	defaults: {
		_windowModelInstance: null,
		visible: false
	},

	initialize: function( attrs ) {
		this.listenTo( attrs._windowModelInstance, 'change:vCoord', this.setVisibility )
	},

	setVisibility: function( model, vCoord ) {
		if ( vCoord > 500 ) {
			this.set({ visible: true });
		} else {
			this.set({ visible: false });
		}
	}

});

export default UpButton;
