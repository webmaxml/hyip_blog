import Backbone from 'backbone';

let ArticleSubscribe = Backbone.Model.extend({

	defaults: {
		loading: false,
		error: '',
		success: ''
	},

	initialize: function( attrs ) {
		this.globalData = attrs._globalData;

		this.ajaxAction = 'article_subscribe';
	},

	subscribe: function( query ) {
		if ( this.get( 'loading' ) ) {
			return;
		}

		this.set({ error: '' });
		this.set({ loading: true });

		$.ajax({
			url: this.globalData.get( 'ajaxUrl' ),
			type: 'POST',
			dataType: 'json',
			data: `action=${ this.ajaxAction }&${ query }`,
			success: this.ajaxSuccess.bind( this ),
			error: this.ajaxError.bind( this )
		});
	},

	ajaxSuccess: function( data ) {
		if ( typeof data.success !== 'boolean' ) {
			console.warn( 'subscribe must receive { success: bool, data: ... }' );
		}

		if ( data.success ) {
			this.set({ success: data.data });
		} else {
			this.set({ error: data.data });
		}

		this.set({ loading: false });
	},

	ajaxError: function( xhr, status, error ) {
		this.set({ error: data.data });
		this.set({ loading: false });
	}

});


export default ArticleSubscribe;