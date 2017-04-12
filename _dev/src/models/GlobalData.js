import globalData from 'globalData';
import localData from 'localData';

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

		if ( typeof localData === 'undefined' ) {
			this.localData = {};
		} else {
			this.localData = localData;
		}
	}

	getAjaxUrl() {
		return this.ajaxUrl;
	}

	getUserData() {
		return this.user;
	} 

	getLocalData() {
		return this.localData;
	}

}

export default GlobalData;