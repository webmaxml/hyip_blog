import Backbone from 'backbone';
import 'slick-carousel';

let SliderView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'slider' )[0];
		this.$el = $( this.el );
		this.$slider = this.$el.find( '#slider' );

		this.delegateEvents({
			'click .slider__prev-btn': 'goPrev',
			'click .slider__next-btn': 'goNext'
		});

		this.initCarousel();
	},

	initCarousel: function() {
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

export default SliderView;