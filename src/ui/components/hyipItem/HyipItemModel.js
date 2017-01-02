import Backbone from 'backbone';

let HyipItemModel = Backbone.Model.extend({

	defaults: {
		chartInstance: null,
		formData: null,
		optionsOpen: false,
		activePlanId: null,
		plans: null,
		activePlan: null
	},

});

export default HyipItemModel;