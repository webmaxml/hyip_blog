import TooltipView from '../views/TooltipView';

class TooltipFactory {

	createView( el ) {
		if ( el.nodeType !== 1 ) { 
			throw new Error( 'TooltipView element is not an HTML element' );
		}

		return new TooltipView({ el });
	}

}

export default TooltipFactory;