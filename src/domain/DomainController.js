class DomainController {

	constructor( plansList ) {
		this.plansList = plansList;
	}

	retrievePlans( cb ) {
		this.plansList.retrievePlans( cb );
	}

}

export default DomainController;