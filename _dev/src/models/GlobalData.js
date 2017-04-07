import globalData from 'globalData';

class GlobalData {

	constructor() {
		if ( typeof globalData.ajaxUrl !== 'string' ) {
			throw new Error( 'globalData.ajaxUrl should be string' );
		}

		if ( typeof globalData.user.loggedIn !== 'boolean' ) {
			throw new Error( 'globalData.user.loggedIn should be boolean' );
		}

		this.ajaxUrl = globalData.ajaxUrl;
		this.user = globalData.user;
	}

	getAjaxUrl() {
		return this.ajaxUrl;
	}

	getUserData() {
		return this.user;
	} 

}

export default GlobalData;