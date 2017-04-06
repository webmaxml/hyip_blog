import Backbone from 'backbone';
import loadTouchEvents from 'jquery-touch-events';
loadTouchEvents( $ );

let UserPopupView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'header__userPanel-wrap' )[0];
		this.$el = $( this.el );
		this.$popup = this.$el.find( '[data-entity="popup"]' );

		this.delegateEvents({
			mouseenter: 'handleMouseEnter',
			mouseleave: 'handleMouseLeave',
			'tap [data-entity="user"]': 'handleTap'
		});
	},

	handleMouseEnter: function( e ) { this.controller.handleMouseEnter( e ); },
	handleMouseLeave: function( e ) { this.controller.handleMouseLeave( e ); },
	handleTap: function( e ) { this.controller.handleTap( e ); },

	show: function() {
		this.$popup.fadeIn( 'fast' );
	},

	hide: function() {
		this.$popup.fadeOut( 'fast' );
	}

});

export default UserPopupView;