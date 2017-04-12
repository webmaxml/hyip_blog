class ModelMapper {

	constructor( plansList, 
				 profitCalcChart,
				 postTabs,
				 windowModel,
				 postLoader ) {
		this.plansList = plansList;
		this.profitCalcChart = profitCalcChart;
		this.postTabs = postTabs;
		this.windowModel = windowModel;
		this.postLoader = postLoader;
	}

	initCommon() {
		this.windowModel.init();
	}

	initRoot() {
		this.initCommon();
		this.postTabs.init();
		this.postLoader.init();
	}

	initPostItem() {
		this.initCommon();
		this.postTabs.init();
	}

	initHyipItem() {
		this.initCommon();
		this.postTabs.init();
		this.plansList.init();
		this.profitCalcChart.init();
	}

	initHyipIndex() {
		this.initCommon();
		this.postTabs.init();
	}

	initUser() {
		this.initCommon();
	}

}

export default ModelMapper;