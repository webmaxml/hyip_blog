import Backbone from 'backbone';

let CommentsRespond = Backbone.Model.extend({

	defaults: {
		active: false,
	},

	toggleActive: function() {
		this.set({ active: !this.get( 'active' ) });
	}

});

export default CommentsRespond;