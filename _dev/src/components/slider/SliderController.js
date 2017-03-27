import Backbone from 'backbone';
import 'slick-carousel';
import loadTouchEvents from 'jquery-touch-events';
loadTouchEvents( $ );


let SliderView = Backbone.View.extend({

	events: {
		'click .slider__prev-btn': 'goPrev',
		'click .slider__next-btn': 'goNext'
	},

	initialize: function() {
		this.$slider = this.$el.find( '#slider' );
		this.$slider.slick({
			dots: false,
			infinite: false,
			arrows: false,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [
			    {
					breakpoint: 1200,
					settings: {
						slidesToShow: 3
					}
			    },
			    {
					breakpoint: 900,
					settings: {
						slidesToShow: 2
					}
			    },
			    {
					breakpoint: 600,
					settings: {
						slidesToShow: 1
					}
			    }
			]
		});
	},

	goPrev: function( e ) {
		this.$slider.slick( 'slickPrev' );
	},

	goNext: function( e ) {
		this.$slider.slick( 'slickNext' );
	}

});

//--------------------------------------------------------------------

let SlideView = Backbone.View.extend({

	events: {
		mouseenter: 'showPopup',
		mouseleave: 'hidePopup',
		'tap .sliderItem__popup': 'togglePopup'
	},

	initialize: function() {
		this.$popup = this.$el.find( '.sliderItem__popup' );
		this.$popup.css( 'transform', 'translateY(-44px)' );
		this.popupActive = false;
	},

	togglePopup: function( e ) {
		e.preventDefault();

		if ( this.popupActive ) {
			this.hidePopup();
			this.popupActive = false;
		} else {
			this.showPopup();
			this.popupActive = true;
		}
	},

	showPopup: function() {
		this.$popup.css( 'transform', 'translateY(-121px)' );
	},

	hidePopup: function() {
		this.$popup.css( 'transform', 'translateY(-44px)' );
	},

});


//--------------------------------------------------------------------

class SliderController {

	init() {
		let slider = document.getElementsByClassName( 'slider' )[0];
		let $slides = $( document.getElementById( 'slider' ) ).children();

		$slides.each( function() {
			let slideView = new SlideView({ el: this });
		} );

		let sliderView = new SliderView({ el: slider });
	}

}

export default SliderController;