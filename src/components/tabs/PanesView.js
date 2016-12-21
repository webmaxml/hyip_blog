import Backbone from 'backbone';

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

export default PanesView;