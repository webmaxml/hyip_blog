import Backbone from 'backbone';

let TabsModel = Backbone.Model.extend({

	defaults: {
		activeIndex: null,
		activeButton: null,
		activePane: null,
	}

});

//----------------------------------------------------------

let ButtonsView = Backbone.View.extend({

	events: {
		click: 'changeActiveIndex'
	},

	initialize: function() {
		this.activeClassName = 'tabs__btn--active';

		this.listenTo( this.model, 'change:activeIndex', this.render );
	},

	changeActiveIndex( e ) {
		let $target = $( e.target );
		let activeIndex = $target.data( 'index' );

		if ( activeIndex ) {
			this.model.set({ activeIndex });
		}
	},

	removeActive: function() {
		let active = this.model.get( 'activeButton' );

		if ( active ) {
			active.removeClass( this.activeClassName );
		}
	},

	render: function( model, activeIndex ) {
		this.removeActive();

		let $activeButton = this.$el.find( `[data-index='${activeIndex}']` )
								    .addClass( this.activeClassName );

		model.set({ activeButton: $activeButton });						   

		return this;
	}

});

//----------------------------------------------------------

let PanesView = Backbone.View.extend({

	initialize: function() {
		this.activeClassName = 'tabs__pane-item--active';

		this.listenTo( this.model, 'change:activeIndex', this.render );
	},

	removeActive: function() {
		let active = this.model.get( 'activePane' );

		if ( active ) {
			active.removeClass( this.activeClassName );
		}
	},

	render: function( model, activeIndex ) {
		this.removeActive();

		let $activePane = this.$el.find( `[data-index='${activeIndex}']` )
								  .addClass( this.activeClassName );

		model.set({ activePane: $activePane });						   

		return this;
	}

});

//----------------------------------------------------------

class TabsController {

	init() {
		let model = new TabsModel();

		let buttonsView = new ButtonsView({ 
			el: document.getElementsByClassName( 'tabs__btn-box' )[0],
			model
		});
		let panesView = new PanesView({ 
			el: document.getElementsByClassName( 'tabs__pane-box' )[0],
			model
		});

		model.set({ activeIndex: 1 });
	}
	
}

export default TabsController;