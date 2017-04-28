import Backbone from 'backbone';
import globalData from 'globalData';
import localData from 'localData';

let GlobalData = Backbone.Model.extend({

	defaults: {
		ajaxUrl: globalData.ajaxUrl,
		user: globalData.user,
		localData: localData
	},

	initialize: function() {
		if ( typeof globalData.ajaxUrl !== 'string' ) {
			throw new Error( 'globalData.ajaxUrl should be string' );
		}

		if ( typeof globalData.user.loggedIn !== 'boolean' ) {
			throw new Error( 'globalData.user.loggedIn should be boolean' );
		}

		if ( typeof localData !== 'object' ) {
			console.warn( 'You should create global localData object in the head' );
		}
	}

}); 

export default GlobalData;