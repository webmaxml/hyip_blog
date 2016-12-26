import Backbone from 'backbone';

let CommentsRespondModel = Backbone.Model.extend({

	defaults: {
		active: false,
		obj: {
			name: 'John',
			age: 24 
		}
	}

});

export default CommentsRespondModel;