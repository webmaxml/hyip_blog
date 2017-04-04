import SliderItemController from '../controllers/SliderItemController';
import SliderItemView from '../views/SliderItemView';

class SliderItemFactory {

	createView( el ) {
		if ( el.nodeType !== 1 ) { 
			throw new Error( 'sliderItemView element is not an HTML element' );
		}

		return new SliderItemView({ el });
	}

	createController( model, view ) {
		if ( typeof model === 'undefined' || typeof view === 'undefined' ) {
			throw new Error( 'model and a view must be provided to sliderItemController' );
		}

		return new SliderItemController( model, view );
	}

}

export default SliderItemFactory;