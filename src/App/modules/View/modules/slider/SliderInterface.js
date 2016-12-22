import SliderView from './SliderView';

class SliderInterface {

	constructor() {}

	init() {
		let view = new SliderView({
			el: document.getElementsByClassName( 'slider' )[0]
		});
	}

}

export default SliderInterface;