import Backbone from 'backbone';

class PostTabsController {

	constructor( tabs, tabsFactory ) {
		_.extend( this, Backbone.Events );

		this.tabs = tabs;
		this.tabsFactory = tabsFactory;

		this.buttonControllers = [];
		this.paneControllers = [];
	}

	init() {
		this.createTabs();
		this.buttonControllers.forEach( controller => controller.init() );
		this.paneControllers.forEach( controller => controller.init() );
	}

	createTabs() {
		let $buttons = $( document.getElementsByClassName( 'tabs__btn-item' ) );
		let $panes = $( document.getElementsByClassName( 'tabs__pane-item' ) );

		$buttons.each( function( i, elem ) {
			let index = +$( elem ).find( 'button' ).data( 'index' );

			let view = this.tabsFactory.createButtonView( elem );
			let model = this.tabs.addButton( index );
			let controller = this.tabsFactory.createButtonController( this.tabs, model, view );

			this.buttonControllers.push( controller );
		}.bind( this ) );


		$panes.each( function( i, elem ) {
			let index = $( elem ).data( 'index' );

			let view = this.tabsFactory.createPaneView( elem );
			let model = this.tabs.addPane( index );
			let controller = this.tabsFactory.createPaneController( this.tabs, model, view );

			this.paneControllers.push( controller );
		}.bind( this ) );
	}

	
}

export default PostTabsController;