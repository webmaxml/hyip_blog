import Backbone from 'backbone';

class ModalsController {

	constructor( modals, modalsFactory ) {
		_.extend( this, Backbone.Events );

		this.modals = modals;
		this.modalsFactory = modalsFactory;

		this.windowControllers = [];
		this.triggerControllers = [];
	}

	init() {
		let $modalWindows = $( document.getElementsByClassName( 'modals__overlay' ) );

		if ( !_.isElement( $modalWindows.get( 0 ) ) ) {
			console.warn( 'not a single modal window has found' );
		}

		$modalWindows.each( ( i, elem ) => {
			let id = elem.dataset.modalWindow;

			if ( typeof id === 'undefined' ) {
				console.warn( 'all modal windows must have data-modal-window attribute' );
			}

			let model = this.modals.addModal( id );
			this.createWindow( model, elem );

			let $triggers = $( document.querySelectorAll( `[data-modal-trigger=${id}]` ) );

			if ( !_.isElement( $triggers.get( 0 ) ) ) {
				console.warn( `not a single trigger for modal ${id} window has found` );
			}

			$triggers.each( ( i, elem ) => this.createTrigger( model, elem ) );
		} )

		this.windowControllers.forEach( controller => controller.init() );
		this.triggerControllers.forEach( controller => controller.init() );
	}

	createWindow( model, elem ) {
		if ( !_.isObject( model ) || !_.isElement( elem ) ) {
			console.warn( 'for creating modal window object model and elem must be provided' );
		}

		let view = this.modalsFactory.createWindowView( elem );
		let controller = this.modalsFactory.createWindowController( model, view );

		this.windowControllers.push( controller );
	}

	createTrigger( model, elem ) {
		if ( !_.isObject( model ) || !_.isElement( elem ) ) {
			console.warn( 'for creating modal trigger object model and elem must be provided' );
		}

		let view = this.modalsFactory.createTriggerView( elem );
		let controller = this.modalsFactory.createTriggerController( model, view );

		this.triggerControllers.push( controller );
	}

}

export default ModalsController;