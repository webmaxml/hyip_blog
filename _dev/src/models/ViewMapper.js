class ViewMapper {

	constructor( user,
				 sliderController, 
				 postTabsController, 
				 tooltipController, 
				 windowController, 
				 upButtonController,
				 commentsController, 
				 profitCalcPlanSelectController, 
				 profitCalcDepositController, 
				 profitCalcRefbackController, 
				 profitCalcChartController, 
				 modalsController, 
				 refbackModalSelectController,
				 userPanel,
				 userTabs,
				 registration,
				 login,
				 postLoader ) {
		this.user = user;

		this.sliderController = sliderController;
		this.postTabsController = postTabsController;
		this.tooltipController = tooltipController;
		this.windowController = windowController;
		this.upButtonController = upButtonController;
		this.commentsController = commentsController;
		this.profitCalcPlanSelectController = profitCalcPlanSelectController;
		this.profitCalcDepositController = profitCalcDepositController;
		this.profitCalcRefbackController = profitCalcRefbackController;
		this.profitCalcChartController = profitCalcChartController;
		this.modalsController = modalsController;
		this.refbackModalSelectController = refbackModalSelectController;
		this.userPanel = userPanel;
		this.userTabs = userTabs;
		this.registration = registration;
		this.login = login;
		this.postLoader = postLoader;
	}

	initCommon() {
		this.sliderController.init();
		this.postTabsController.init();
		this.tooltipController.init();
		this.windowController.init();
		this.upButtonController.init();
		this.modalsController.init();
		this.refbackModalSelectController.init();

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
		this.commentsController.init();
	}

	initHyipItem() {
		this.initCommon();
		this.commentsController.init();
		this.profitCalcPlanSelectController.init();
		this.profitCalcDepositController.init();
		this.profitCalcRefbackController.init();
		this.profitCalcChartController.init();
	}

	initHyipIndex() {
		this.initCommon();
	}

	initUser() {
		this.initCommon();
		this.userTabs.init();
	}

}

export default ViewMapper;