class UIFacade {

	constructor( slider, 
				 tabs, 
				 tooltip, 
				 upButton, 
				 comments, 
				 profit, 
				 modals, 
				 userPanel,
				 userTabs,
				 registration,
				 login ) {
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
	}

	initCommon() {
		this.slider.init();
		this.tabs.init();
		this.tooltip.init();
		this.upButton.init();
		this.modals.init();
		this.userPanel.init();
		this.registration.init();
		this.login.init();
	}

	initRoot() {
		this.initCommon();
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