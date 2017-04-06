import Backbone from 'backbone';

let UserPopup = Backbone.Model.extend({

	defaults: {
		active: false
	},

	toggleActive: function() {
		this.set({ active: !this.get( 'active' ) });
	}

});

export default UserPopup;
