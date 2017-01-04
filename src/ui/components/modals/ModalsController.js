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

		if ( isOverlay || isCloseButton ) {
			let active = this.model.get( 'active' );
			this.model.set({ active: !active });
		}
	},

	render: function( model, active ) {
		if ( active ) {
			this.$el.fadeIn( 'fast' );
		} else {
			this.$el.fadeOut( 'fast' );
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
		this.model.set({ active: !active });
	}

});


//-------------------------------------------------------

class ModalsController {

	constructor( select ) {
		this.select = select;
	}

	init() {
		let $triggers = $( document.querySelectorAll( '[data-modal-trigger]' ) );
		let $windowContainer = $( document.getElementsByClassName( 'modals' )[0] );

		$triggers.each( function() {
			let modalId = $( this ).data( 'modalTrigger' );
			let $modalWindow = $windowContainer.find( `[data-modal-window=${modalId}]` );

			let model = new Model();

			let triggerView = new TriggerView({ el: this, model });
			let modalView = new ModalView({ el: $modalWindow.get(0), model });
			
		} );

		this.select.init();
	}

}

export default ModalsController;