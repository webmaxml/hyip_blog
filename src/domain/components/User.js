import globalData from '../../globalData';


class User {

	constructor() {
		this.user = globalData.user;
	}

	isRegistered() {
		return this.user ? true : false;
	}

}

export default User;