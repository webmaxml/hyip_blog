class DomainFacade {

	constructor( plansList ) {
		this.plansList = plansList;
	}

	loadPlans() {
		this.plansList.loadPlans();
	}

}

export default DomainFacade;