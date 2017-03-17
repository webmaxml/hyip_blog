class UIFacade {

	constructor( domainFacade,
				 slider, 
				 tabs, 
				 tooltip, 
				 upButton, 
				 comments, 
				 profit, 
				 modals, 
				 userPanel,
				 userTabs,
				 registration,
				 login,
				 postLoader ) {
		this.domainFacade = domainFacade;
		this.slider = slider;
		this.tabs = tabs;
		this.tooltip = tooltip;
		this.upButton = upButton;
		this.comments = comments;
		this.profit = profit;
		this.modals = modals;
		this.userPanel = userPanel;
		this.userTabs = userTabs;
		this.registration = registration;
		this.login = login;
		this.postLoader = postLoader;
	}

	initCommon() {
		this.slider.init();
		this.tabs.init();
		this.tooltip.init();
		this.upButton.init();
		this.modals.init();

		if ( this.domainFacade.isUserRegistered() ) {
			this.userPanel.init();
		} else {
			this.registration.init();
			this.login.init();
		}
	
	}

	initRoot( pageNum ) {
		this.initCommon();
		this.postLoader.init( pageNum );
	}

	initPostItem() {
		this.initCommon();
		this.comments.init();
	}

	initHyipItem() {
		this.initCommon();
		this.comments.init();
		this.profit.init();
	}

	initHyipIndex() {
		this.initCommon();
	}

	initUser() {
		this.initCommon();
		this.userTabs.init();
	}

	setPlans( plans ) {
		this.profit.setPlans( plans );
	}

}

export default UIFacade;