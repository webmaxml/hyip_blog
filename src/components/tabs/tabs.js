export class Tabs {

	constructor() {
		this.activeIndex = null;
		this.$activeBtn = null;
		this.$activePane = null;

		this.$tabBox = $( document.getElementsByClassName( 'tabs__btn-box' )[0] );
		this.$paneBox = $( document.getElementsByClassName( 'tabs__pane-box' )[0] );

		this.$tabBox.on( 'click', this.clickHandler.bind( this ) );

		this.setActive( 1 );
	}

	clickHandler( e ) {
		let index = $( e.target ).data( 'index' );

		if ( this.isAlreadyActive( index ) ) { return }
		
		this.hideActive();
		this.setActive( index );
	}

	isAlreadyActive( index ) {
		return this.activeIndex === index;
	}

	hideActive() {
		this.$activeBtn.removeClass( 'tabs__btn--active' );
		this.$activePane.removeClass( 'tabs__pane-item--active' );
	}

	setActive( index ) {
		this.activeIndex = index;
		this.$activeBtn = this.$tabBox.find( `[data-index='${index}']` ).addClass( 'tabs__btn--active' );
		this.$activePane = this.$paneBox.find( `[data-index='${index}']` ).addClass( 'tabs__pane-item--active' );
	}

}

