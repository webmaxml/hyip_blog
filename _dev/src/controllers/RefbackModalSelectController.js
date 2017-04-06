import Backbone from 'backbone';

class RefbackModalSelectController {

	constructor( select, selectView ) {
		_.extend( this, Backbone.Events );

		this.select = select;
		this.selectView = selectView;
	}

	init() {
		this.selectView.init( this );

		this.listenTo( this.select, 'change:open', this.setOpen );
		this.listenTo( this.select, 'change:value', this.setValue );

		this.select.init( this.selectView.getRealSelectValue() );
	}

	//------------------------------ View callbacks -------------------------------

	handleSelectClick( event ) {
		this.select.toggleOpen();
	}

	handleOptionClick( event ) {
		this.select.set({ value: event.target.dataset.value });
	}

	//------------------------------ Model callbacks -------------------------------

	setOpen( model, open ) {
		if ( open ) {
			this.selectView.openOptions();
		} else {
			this.selectView.hideOptions();
		}
	}

	setValue( model, value ) {
		this.selectView.renderActiveValue( value );
	}

}

export default RefbackModalSelectController;