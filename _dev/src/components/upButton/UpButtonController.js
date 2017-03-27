import Backbone from 'backbone';

let UpButtonModel = Backbone.Model.extend({

	defaults: {
		visible: false
	}

});

//----------------------------------------------------------------

let UpButtonView = Backbone.View.extend({

	initialize: function() {
		this.listenTo( this.model, 'change:visible', this.render );
	},

	events: {
		click: 'scrollToTop'
	},

	scrollToTop: function( e ) {
		$( "html, body" ).animate({ scrollTop: 0 }, "slow");
	},

	render: function( model, visible ) {
		if ( visible ) {
			this.$el.addClass( 'up--active' );
		} else {
			this.$el.removeClass( 'up--active' );
		}
	}

});

//----------------------------------------------------------------

let WindowView = Backbone.View.extend({

	events: {
		scroll: 'changeButtonVisibility'
	},

	changeButtonVisibility: _.throttle( function( e ) {

		if ( window.pageYOffset > 500 ) {
			this.model.set({ visible: true });
		} else {
			this.model.set({ visible: false });
		}

		return this;

	}, 500 )

});

//----------------------------------------------------------------

class UpButtonController {

	init() {
		let model = new UpButtonModel();

		let windowView = new WindowView({
			el: window,
			model
		});

		let view = new UpButtonView({
			el: document.getElementsByClassName( 'up' )[0],
			model
		});
	}

}

export default UpButtonController;