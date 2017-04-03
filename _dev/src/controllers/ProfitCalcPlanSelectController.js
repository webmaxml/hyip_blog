import Backbone from 'backbone';

class ProfitCalcPlanSelectController {

	constructor( plansList, planSelect, planSelectView ) {
		_.extend( this, Backbone.Events );

		this.plansList = plansList;
		this.planSelect = planSelect;
		this.planSelectView = planSelectView;
	}

	init() {
		this.planSelectView.init( this );

		this.listenTo( this.plansList, 'change:plansList', this.setSelectOptions );
		this.listenTo( this.plansList, 'change:activePlan', this.setActiveSelectOption );
		this.listenTo( this.planSelect, 'change:open', this.toggleSelectOptions );
	}

	//------------------------------ View callbacks -------------------------------

	handleSelectClick( event ) {
		this.planSelect.toggleOpen();
	}

	handleSelectOptionClick( event ) {
		let value = $( event.target ).data( 'value' );
		this.plansList.setActivePlan( value );
	}

	//------------------------------ Model callbacks -------------------------------

	setSelectOptions( model, plansList  ) {
		let data = plansList.map( plan => {
			return { value: plan.id, text: plan.name };
		} )

		this.planSelectView.setOptions( data );
	}

	setActiveSelectOption( model, plan  ) {
		let data = {
			id: plan.id,
			name: plan.name
		};

		this.planSelectView.renderActiveOption( data );
	}

	toggleSelectOptions( model, open ) {
		if ( open ) {
			this.planSelectView.showOptions();
		} else {
			this.planSelectView.hideOptions();
		}
	}

}

export default ProfitCalcPlanSelectController;