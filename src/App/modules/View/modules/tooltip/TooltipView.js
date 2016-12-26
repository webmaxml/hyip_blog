import Backbone from 'backbone';
import 'tooltipster';

let TooltipView = Backbone.View.extend({

	initialize: function() {
		this.$el.tooltipster({
			theme: 'tooltipster-borderless',
			side: 'top'
		});
	}

});

export default TooltipView;