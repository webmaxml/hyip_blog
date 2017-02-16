import Backbone from 'backbone';
import loadTouchEvents from 'jquery-touch-events';
loadTouchEvents( $ );

let Model = Backbone.Model.extend({

	defaults: {
		active: false
	}

});

//----------------------------------------------------------

let View = Backbone.View.extend({

	events: {
		mouseenter: 'togglePopup',
		mouseleave: 'togglePopup',
		'tap [data-entity="user"]': 'togglePopup',
	},

	initialize: function() {
		this.$popup = this.$el.find( '[data-entity="popup"]' );

		this.listenTo( this.model, 'change:active', this.render );
	},

	togglePopup: function( e ) {
		e.preventDefault();

		let active = this.model.get( 'active' );
		this.model.set({ active: !active });
	},

	render: function( model, active ) {
		if ( active ) {
			this.$popup.fadeIn( 'fast' );
		} else {
			this.$popup.fadeOut( 'fast' );
		}

		return this;
	}

})


//----------------------------------------------------------

class UserPanelController {

	constructor( domainFacade ) {
		this.domainFacade = domainFacade;
	}

	init() {
		if ( this.domainFacade.isUserRegistered() ) { 
			let panel = document.getElementsByClassName( 'header__userPanel-wrap' )[0];
			let panelModel = new Model();
			let panelView = new View({ el: panel, model: panelModel });
		}
	}
	
}

export default UserPanelController;