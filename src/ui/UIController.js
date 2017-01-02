class UIController {

	constructor( slider, tabs, tooltip, upButton, comments, profit ) {
		this.slider = slider;
		this.tabs = tabs;
		this.tooltip = tooltip;
		this.upButton = upButton;
		this.comments = comments;
		this.profit = profit;
	}

	initCommon() {
		this.slider.init();
		this.tabs.init();
		this.tooltip.init();
		this.upButton.init();
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

	setPlans( plans ) {
		this.profit.setPlans( plans );
	}

}

export default UIController;