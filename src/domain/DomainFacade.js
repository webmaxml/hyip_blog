class DomainFacade {

	constructor( plansList, user ) {
		this.plansList = plansList;
		this.user = user;
	}

	loadPlans() {
		this.plansList.loadPlans();
	}

	isUserRegistered() {
		return this.user.isRegistered();
	}

}

export default DomainFacade;