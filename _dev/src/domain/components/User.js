class User {

	constructor() {
		this.user = globalData.user;
	}

	isRegistered() {
		if ( this.user.registered ) {
			console.log( 'user registered' );
		} else {
			console.log( 'user not registered' );
		}

		return this.user.registered;
	}

}

export default User;