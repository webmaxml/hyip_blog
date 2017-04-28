import Backbone from 'backbone';

let PostContainerView = Backbone.View.extend({

	init: function( controller ) {
		this.controller = controller;

		this.el = document.getElementsByClassName( 'post-box' )[0];
		this.$el = $( this.el );
	},

	addPosts: function( htmlString ) {
		$( htmlString ).hide()
					   .appendTo( this.$el )
					   .fadeIn( 'fast' );
	},

	addSocialVKButton: function( postId, buttonHtml ) {
		this.$el.find( `[data-item-id=${postId}] .postThumbnail__social-link-vk` )
				.append( buttonHtml );
	}

});

export default PostContainerView;