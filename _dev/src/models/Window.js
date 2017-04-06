import Backbone from 'backbone';

let Window = Backbone.Model.extend({

	defaults: {
		vCoord: null
	},

	init: function() {
		this.set({ vCoord: window.pageYOffset });
	}

});

export default Window;
