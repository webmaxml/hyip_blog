class User {

	constructor() {
		this.user = globalData.user;
	}

	isRegistered() {
		return this.user.registered;
	}

}

export default User;