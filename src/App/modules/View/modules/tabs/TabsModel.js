import Backbone from 'backbone';

let TabsModel = Backbone.Model.extend({

	defaults: {
		activeIndex: null,
		activeButton: null,
		activePane: null,
	}

});

export default TabsModel;