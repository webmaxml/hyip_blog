import Backbone from 'backbone';

class TooltipController {

	constructor( tooltipFactory ) {
		_.extend( this, Backbone.Events );

		this.tooltipFactory = tooltipFactory;
		this.tooltipViews = [];
	}

	init() {
		let $tooltips = $( document.getElementsByClassName( 'tooltip' ) );

		$tooltips.each( function( i, elem ) {
			let view = this.tooltipFactory.createView( elem );
			this.tooltipViews.push( view );
		}.bind( this ) );
	}

}

export default TooltipController;