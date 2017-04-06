import Backbone from 'backbone';

let ModalWindowView = Backbone.View.extend({

	events: {
		click: 'handleClick'
	},

	handleClick: function( e ) { 
		let isOverlay = e.target === e.currentTarget;
		let isCloseButton = e.target.classList.contains( 'modals__close' ) || 
						    e.target.classList.contains( 'modals__close-icon' );
		let isInnerTrigger = typeof e.target.dataset.modalTrigger !== 'undefined';

		if ( isOverlay || isCloseButton || isInnerTrigger ) {
			this.controller.handleClick( e ); 
		}
	},

	init: function( controller ) {
		this.controller = controller;
	},

	show: function() {
		this.$el.css( 'display', 'flex' )
				.animate({ opacity: 1 }, 'fast' );
	},

	hide: function() {
		this.$el.animate({ opacity: 0 }, 'fast', function() {
			$( this ).css( 'display', 'none' );
		} );
	}

});

export default ModalWindowView;