import Backbone from 'backbone';

let User = Backbone.Model.extend({

	defaults: {
		_globalData: null,
		loggedIn: null,
		loginStatus: 'pending',
		regStatus: 'pending'
	},

	initialize: function( attrs ) {
		let globalData = attrs._globalData;

		this.set({ 
			loggedIn: globalData.user.loggedIn 
		});

		this.loginAjaxAction = 'hyip_log';
		this.regAjaxAction = 'hyip_reg';
	},

	resetLoginStatus: function() {
		this.set({ loginStatus: 'pending' });
	},

	resetRegStatus: function() {
		this.set({ regStatus: 'pending' });
	},

	isLoggedIn: function() {
		return this.get( 'loggedIn' );
	},

	login: function( query ) {
		if ( typeof query !== 'string' ) {
			throw new Error( 'you should provide query string to User.login method' );
		};

		$.ajax({
			url: this.get( '_globalData' ).ajaxUrl,
			type: 'POST',
			dataType: 'json',
			data: 'action=' + this.loginAjaxAction + '&' + query,
			success: this.loginAjaxSuccess.bind( this ),
			error: this.loginAjaxError.bind( this )
		});
	},

	loginAjaxSuccess: function( data ) {
		if ( data.success ) {
			this.set({ loginStatus: 'success' });
		} else {
			if ( typeof data.data !== 'string' ) {
				this.set({ loginStatus: 'Тут должна быть ошибка, но похоже мы забыли ее добавить. Извините.' });
			} else {
				this.set({ loginStatus: data.data });
			};
		};

		this.resetLoginStatus();
	},

	loginAjaxError: function( xhr, status, error ) {
		this.set({ loginStatus: error });
		this.resetLoginStatus();
	},

	register: function( query ) {
		if ( typeof query !== 'string' ) {
			throw new Error( 'you should provide query string to User.register method' );
		};

		$.ajax({
			url: this.get( '_globalData' ).ajaxUrl,
			type: 'POST',
			dataType: 'json',
			data: 'action=' + this.regAjaxAction + '&' + query,
			success: this.regAjaxSuccess.bind( this ),
			error: this.regAjaxError.bind( this )
		});
	},

	regAjaxSuccess: function( data ) {
		if ( data.success ) {
			this.set({ regStatus: 'success' });
		} else {
			if ( typeof data.data !== 'string' ) {
				this.set({ regStatus: 'Тут должна быть ошибка, но похоже мы забыли ее добавить. Извините.' });
			} else {
				this.set({ regStatus: data.data });
			};
		};

		this.resetRegStatus();
	},

	regAjaxError: function( xhr, status, error ) {
		this.set({ regStatus: error });
		this.resetRegStatus();
	}

});

export default User;