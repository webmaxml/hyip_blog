import Backbone from 'backbone';

let Model = Backbone.Model.extend({

	defaults: {
		active: false
	}

});

//-------------------------------------------------------

let ModalView = Backbone.View.extend({

	events: {
		click: 'toggleActive'
	},

	initialize: function() {
		this.listenTo( this.model, 'change:active', this.render );
	},

	toggleActive: function( e ) {
		let isOverlay = e.target === e.currentTarget;
		let isCloseButton = e.target.classList.contains( 'modals__close' ) || 
						    e.target.classList.contains( 'modals__close-icon' );
		let isInnerTrigger = typeof e.target.dataset.modalTrigger !== 'undefined';

		if ( isOverlay || isCloseButton || isInnerTrigger ) {
			let active = this.model.get( 'active' );
			this.model.set({ active: false });
		}
	},

	render: function( model, active ) {
		if ( active ) {
			this.$el.css( 'display', 'flex' )
			        .animate({
			        	opacity: 1
			        }, 'fast' );
		} else {
			this.$el.animate({ opacity: 0 }, 'fast', function() {
				$( this ).css( 'display', 'none' );
			} );
		}
	}

});


//-------------------------------------------------------

let TriggerView = Backbone.View.extend({

	events: {
		click: 'toggleActive'
	},

	toggleActive: function( e ) {
		let active = this.model.get( 'active' );
		this.model.set({ active: true });
	}

});


//-------------------------------------------------------

class ModalsController {

	constructor( select ) {
		this.select = select;
	}

	init() {
		this.createModalSet( 'addHyip' );
		this.createModalSet( 'refback' );
		this.createModalSet( 'mobileMenu' );
		this.createModalSet( 'registration' );

		this.select.init();
	}

	createModalSet( id ) {
		let $windowContainer = $( document.getElementsByClassName( 'modals' )[0] );
		let $triggers = $( document.querySelectorAll( `[data-modal-trigger=${id}]` ) );
		let $modalWindow = $windowContainer.find( `[data-modal-window=${id}]` );

		let model = new Model();

		let modalView = new ModalView({ el: $modalWindow.get(0), model });

		$triggers.each( function() {
			let triggerView = new TriggerView({ el: this, model });
		} );
	}

}

export default ModalsController;