import Backbone from 'backbone';
import loadTouchEvents from 'jquery-touch-events';
loadTouchEvents( $ );

let SliderItemView = Backbone.View.extend({

	events: {
		mouseenter: 'handleMouseEnter',
		mouseleave: 'handleMouseLeave',
		'tap .sliderItem__popup': 'handleTap'
	},

	handleMouseEnter: function( e ) { this.controller.handleMouseEnter( e ); },
	handleMouseLeave: function( e ) { this.controller.handleMouseLeave( e ); },
	handleTap: function( e ) { this.controller.handleTap( e ); },

	initialize: function() {
		this.$popup = this.$el.find( '.sliderItem__popup' );
		this.$popup.css( 'transform', 'translateY(-44px)' );
	},

	init: function( controller ) {
		this.controller = controller;
	},

	showPopup: function() {
		this.$popup.css( 'transform', 'translateY(-121px)' );
	},

	hidePopup: function() {
		this.$popup.css( 'transform', 'translateY(-44px)' );
	},

});

export default SliderItemView;