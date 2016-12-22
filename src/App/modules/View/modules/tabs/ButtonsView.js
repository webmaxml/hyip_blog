import Backbone from 'backbone';

let ButtonsView = Backbone.View.extend({

	events: {
		click: 'changeActiveIndex'
	},

	initialize: function() {
		this.activeClassName = 'tabs__btn--active';

		this.listenTo( this.model, 'change:activeIndex', this.render );
	},

	changeActiveIndex: function( e ) {
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

export default ButtonsView;