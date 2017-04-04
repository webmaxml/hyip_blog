import Backbone from 'backbone';

class SliderController {

	constructor( slider, sliderItemFactory, sliderView ) {
		_.extend( this, Backbone.Events );

		this.slider = slider;
		this.sliderItemFactory = sliderItemFactory;
		this.sliderView = sliderView;

		this.sliderItemControllers = [];
	}

	init() {
		this.sliderView.init( this );
		this.createSliderItems();

		this.sliderItemControllers.forEach( controller => controller.init() );
	}

	createSliderItems() {
		let $slides = $( document.getElementsByClassName( 'sliderItem' ) );

		$slides.each( function( i, elem ) {
			let model = this.slider.add({});
			let view = this.sliderItemFactory.createView( elem );
			let controller = this.sliderItemFactory.createController( model, view );

			this.sliderItemControllers.push( controller );
		}.bind( this ) );
	}

}

export default SliderController;