import CommentsRespond from '../models/CommentsRespond';
import CommentsRespondController from '../controllers/CommentsRespondController';
import CommentsRespondView from '../views/CommentsRespondView';

class CommentsRespondFactory {

	createRespond( el ) {
		let respond = {};
		respond.model = new CommentsRespond();
		respond.view = new CommentsRespondView({ el });
		respond.controller = new CommentsRespondController( respond.model, respond.view );

		return respond;
	}

}

export default CommentsRespondFactory;