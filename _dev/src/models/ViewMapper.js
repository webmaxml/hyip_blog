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
				 userPopupController,
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
		this.userPopupController = userPopupController;
		this.userTabs = userTabs;
		this.registration = registration;
		this.login = login;
		this.postLoader = postLoader;
	}

	initCommon() {
		this.sliderController.init();
		this.tooltipController.init();
		this.windowController.init();
		this.upButtonController.init();
		this.modalsController.init();
		this.refbackModalSelectController.init();

		if ( this.user.isRegistered() ) {
			this.userPopupController.init();
		} else {
			this.registration.init();
			this.login.init();
		}
	
	}

	initRoot( params ) {
		this.initCommon();
		this.postTabsController.init();
		this.postLoader.init( params );
	}

	initPostItem() {
		this.initCommon();
		this.postTabsController.init();
		this.commentsController.init();
	}

	initHyipItem() {
		this.initCommon();
		this.postTabsController.init();
		this.commentsController.init();
		this.profitCalcPlanSelectController.init();
		this.profitCalcDepositController.init();
		this.profitCalcRefbackController.init();
		this.profitCalcChartController.init();
	}

	initHyipIndex() {
		this.initCommon();
		this.postTabsController.init();
	}

	initUser() {
		this.initCommon();
		this.userTabs.init();
	}

}

export default ViewMapper;