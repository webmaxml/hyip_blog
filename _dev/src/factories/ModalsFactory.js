import ModalWindowController from '../controllers/ModalWindowController';
import ModalTriggerController from '../controllers/ModalTriggerController';
import ModalWindowView from '../views/ModalWindowView';
import ModalTriggerView from '../views/ModalTriggerView';

class ModalsFactory {

	createWindowView( el ) {
		if ( el.nodeType !== 1 ) { 
			throw new Error( 'ModalWindowView element is not an HTML element' );
		}

		return new ModalWindowView({ el });
	}

	createWindowController( model, view ) {
		if ( typeof model === 'undefined' || typeof view === 'undefined' ) {
			throw new Error( 'model and a view must be provided to ModalWindowController' );
		}

		return new ModalWindowController( model, view );
	}

	createTriggerView( el ) {
		if ( el.nodeType !== 1 ) { 
			throw new Error( 'ModalTriggerView element is not an HTML element' );
		}

		return new ModalTriggerView({ el });
	}

	createTriggerController( model, view ) {
		if ( typeof model === 'undefined' || typeof view === 'undefined' ) {
			throw new Error( 'model and a view must be provided to ModalTriggerController' );
		}

		return new ModalTriggerController( model, view );
	}
}

export default ModalsFactory;