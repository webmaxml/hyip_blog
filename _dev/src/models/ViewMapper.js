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
				 registrationFormController,
				 loginFormController,
				 postLoaderController ) {
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
		this.registrationFormController = registrationFormController;
		this.loginFormController = loginFormController;
		this.postLoaderController = postLoaderController;
	}

	initCommon() {
		this.sliderController.init();
		this.tooltipController.init();
		this.windowController.init();
		this.upButtonController.init();
		this.modalsController.init();
		this.refbackModalSelectController.init();

		if ( this.user.isLoggedIn() ) {
			this.userPopupController.init();
		} else {
			this.registrationFormController.init();
			this.loginFormController.init();
		}
	
	}

	initRoot() {
		this.initCommon();
		this.postTabsController.init();
		this.postLoaderController.init();
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