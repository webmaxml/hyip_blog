import Backbone from 'backbone';

class SliderItemController {

	constructor( sliderItem, sliderItemView ) {
		_.extend( this, Backbone.Events );

		this.sliderItem = sliderItem;
		this.sliderItemView = sliderItemView;
	}

	init() {
		this.sliderItemView.init( this );

		this.listenTo( this.sliderItem, 'change:popupActive', this.setPopupActive );
	}

	//------------------------------ View callbacks -------------------------------

	handleMouseEnter( event ) {
		this.sliderItem.togglePopupActive();
	}

	handleMouseLeave( event ) {
		this.sliderItem.togglePopupActive();
	}

	handleTap( event ) {
		event.preventDefault();
		this.sliderItem.togglePopupActive();
	}

	//------------------------------ Model callbacks -------------------------------

	setPopupActive( model, active ) {
		if ( active ) {
			this.sliderItemView.showPopup();
		} else {
			this.sliderItemView.hidePopup();
		}
	}

}

export default SliderItemController;