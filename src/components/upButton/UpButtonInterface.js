import UpButtonModel from './UpButtonModel';
import WindowView from './WindowView';
import UpButtonView from './UpButtonView';

class UpButtonInterface {

	constructor() {}

	init() {
		let model = new UpButtonModel();

		let windowView = new WindowView({
			el: window,
			model
		});

		let view = new UpButtonView({
			el: document.getElementsByClassName( 'up' )[0],
			model
		});
	}

}

export default UpButtonInterface;