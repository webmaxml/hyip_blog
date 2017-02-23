if ( process.env.NODE_ENV === 'development' ) {
	let globalData = require( '../../globalData' );
}


class User {

	constructor() {
		this.user = globalData.user;
		console.log( globalData );
	}

	isRegistered() {
		return this.user ? true : false;
	}

}

export default User;