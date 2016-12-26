import TooltipView from './TooltipView';

class TooltipInterface {

	init() {
		let $tooltips = $( document.getElementsByClassName( 'tooltip' ) );

		$tooltips.each( function() {
			let view = new TooltipView({ el: this });
		} )
		
	}

}

export default TooltipInterface;