import Backbone from 'backbone';

let SliderItem = Backbone.Model.extend({

	defaults: {
		popupActive: false,
	},

	togglePopupActive: function() {
		this.set({ popupActive: !this.get( 'popupActive' ) });
	}

});

let Slider = Backbone.Collection.extend({

	model: SliderItem

});

export default Slider;