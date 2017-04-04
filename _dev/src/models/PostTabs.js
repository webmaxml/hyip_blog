import Backbone from 'backbone';

let PostTabsButton = Backbone.Model.extend({

	defaults: {
		index: null,
		active: false
	}

});

let PostTabsPane = Backbone.Model.extend({

	defaults: {
		index: null,
		active: false
	}

});

let PostTabs = Backbone.Model.extend({

	defaults: {
		activeIndex: null,
		buttons: [],
		panes: []
	},

	initialize: function() {
		this.listenTo( this, 'change:activeIndex', this.setActiveTab );
	},

	init: function() {
		this.set({ activeIndex: 1 });
	},

	addButton: function( index ) {
		let buttons = this.get( 'buttons' );
		let button = new PostTabsButton({ index });

		buttons.push( button );
		this.set({ buttons });

		return button;
	},

	addPane: function( index ) {
		let panes = this.get( 'panes' );
		let pane = new PostTabsPane({ index });

		panes.push( pane );
		this.set({ panes });

		return pane;
	},

	setActiveTab: function( model, activeIndex ) {
		let buttons = this.get( 'buttons' );
		let panes = this.get( 'panes' );

		let currentActiveButton = _.find( buttons, button => button.get( 'active' ) === true );
		if ( currentActiveButton ) {
			currentActiveButton.set({ active: false });
		}

		let currentActivePane = _.find( panes, pane => pane.get( 'active' ) === true );
		if ( currentActivePane ) {
			currentActivePane.set({ active: false });
		}

		let button = _.find( buttons, button => button.get( 'index' ) === activeIndex );
		if ( !button ) {
			throw new Error( 'there is no button with index of ' + activeIndex + ' in PostTabs' );
		}

		let pane = _.find( panes, pane => pane.get( 'index' ) === activeIndex );
		if ( !pane ) {
			throw new Error( 'there is no pane with index of ' + activeIndex + ' in PostTabs' );
		}

		button.set({ active: true });
		pane.set({ active: true });
	}

});

export default PostTabs;
