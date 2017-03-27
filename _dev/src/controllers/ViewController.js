class ViewController {

	constructor( user,
				 slider, 
				 postTabs, 
				 tooltip, 
				 upButton, 
				 comments, 
				 profitCalc, 
				 modals, 
				 userPanel,
				 userTabs,
				 registration,
				 login,
				 postLoader ) {
		this.user = user;
		this.slider = slider;
		this.postTabs = postTabs;
		this.tooltip = tooltip;
		this.upButton = upButton;
		this.comments = comments;
		this.profitCalc = profitCalc;
		this.modals = modals;
		this.userPanel = userPanel;
		this.userTabs = userTabs;
		this.registration = registration;
		this.login = login;
		this.postLoader = postLoader;
	}

	initCommon() {
		this.slider.init();
		this.postTabs.init();
		this.tooltip.init();
		this.upButton.init();
		this.modals.init();

		if ( this.user.isRegistered() ) {
			this.userPanel.init();
		} else {
			this.registration.init();
			this.login.init();
		}
	
	}

	initRoot( params ) {
		this.initCommon();
		this.postLoader.init( params );
	}

	initPostItem() {
		this.initCommon();
		this.comments.init();
	}

	initHyipItem() {
		this.initCommon();
		this.comments.init();
		this.profitCalc.init();
	}

	initHyipIndex() {
		this.initCommon();
	}

	initUser() {
		this.initCommon();
		this.userTabs.init();
	}

}

export default ViewController;