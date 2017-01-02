import Backbone from 'backbone';
import 'slick-carousel';

let SliderView = Backbone.View.extend({

	events: {
		'click .slider__prev-btn': 'goPrev',
		'click .slider__next-btn': 'goNext'
	},

	initialize: function() {
		this.$slider = this.$el.find( '#slider' );
		this.$slider.slick({
			dots: false,
			infinite: true,
			arrows: false,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1
		});
	},

	goPrev: function( e ) {
		this.$slider.slick( 'slickPrev' );
	},

	goNext: function( e ) {
		this.$slider.slick( 'slickNext' );
	}

});

class SliderController {

	init() {
		let view = new SliderView({
			el: document.getElementsByClassName( 'slider' )[0]
		});
	}

}

export default SliderController;