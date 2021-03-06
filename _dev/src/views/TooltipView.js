import Backbone from 'backbone';
import 'tooltipster';

let TooltipView = Backbone.View.extend({

	initialize: function() {
		this.$el.tooltipster({
			theme: 'tooltipster-borderless',
			side: 'top',
			trigger: 'custom',
			triggerOpen: {
				mouseenter: true,
				tap: true
			},
			triggerClose: {
				mouseleave: true,
				tap: true
			}
		});
	}

});

export default TooltipView;