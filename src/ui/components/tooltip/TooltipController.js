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

class TooltipController {

	init() {
		let $tooltips = $( document.getElementsByClassName( 'tooltip' ) );

		$tooltips.each( function() {
			let view = new TooltipView({ el: this });
		} );
	}

}

export default TooltipController;