import TabsModel from './TabsModel';
import ButtonsView from './ButtonsView';
import PanesView from './PanesView';

class TabsInterface {

	constructor() {}

	init() {
		let model = new TabsModel();
		let buttonsView = new ButtonsView({ 
			el: document.getElementsByClassName( 'tabs__btn-box' )[0],
			model
		});
		let panesView = new PanesView({ 
			el: document.getElementsByClassName( 'tabs__pane-box' )[0],
			model
		});

		model.set({ activeIndex: 1 });
	}

}

export default TabsInterface;