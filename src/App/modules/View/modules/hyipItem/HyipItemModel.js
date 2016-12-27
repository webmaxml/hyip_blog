import Backbone from 'backbone';

let HyipItemModel = Backbone.Model.extend({

	defaults: {
		chartInstance: null,
		formData: null,
		optionsOpen: false,
		activePlanId: null,
		plans: null
	}

});

export default HyipItemModel;