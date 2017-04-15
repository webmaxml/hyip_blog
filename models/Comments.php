<?php

class Comments {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->comment = Comment_Item::get_instance();
		$this->user = Hyip_User::get_instance();

		$this->children = array();
	}

	public function create_comment( $post_id, $parent, $content ) {
		$user = $this->user->get_user();

		$data = array(
			'comment_post_ID' => $post_id,
			'comment_author' => $user->data->user_login,
			'comment_author_email' => $user->data->user_email,
			'comment_author_url' => $user->data->user_url, 
			'comment_content' => $content,
			'comment_type' => '',
			'comment_parent' => $parent, 
			'user_id' => $user->ID,
		);

		wp_new_comment( $data );
	}

	public function increment_rating( $comment_id ) {
		$rating = get_comment_meta( $comment_id, 'c_rating', true );
		update_comment_meta( $comment_id, 'c_rating', ++$rating );
	}

	public function get_number( $post ) {
		return get_comments_number( $post->ID );
	}

	public function get_comments_string( $post ) {
		$number = $this->get_number( $post );

		switch ( $number ) {
			case 0:
				return '0 комментариев';
			case 1:
				return '1 комментарий';
			default:
				return $number . ' комментариев';
		}
	}

	public function get_comment_children( $wp_comment ) {
		$children = get_comments( array(
			'status' => 'approve',
			'orderby' => 'comment_date',
			'order' => 'ASC',
			'parent' => $wp_comment->comment_ID
		) );

		if ( empty( $children ) ) {
			return;
		}

		foreach ( $children as $child ) {
			$this->children[] = $this->comment->get_comment( $child );
			$this->get_comment_children( $child );
		}
	}

	public function get_comments( $post = false ) {
		if ( !$post ) {
			$post = $GLOBALS[ 'post' ];
		}

		$comments = array();

		$top_comments = get_comments( array(
			'post_id' => $post->ID,
			'status' => 'approve',
			'orderby' => 'comment_date',
			'number' => get_option( 'comments_per_page' ),
			'parent' => 0
		) );

		foreach ( $top_comments as $top_comment ) {
			$comment = $this->comment->get_comment( $top_comment );
			$this->get_comment_children( $top_comment );
			
			$comment[ 'children' ] = $this->children;
			$this->children = array();

			$comments[] = $comment;
		}

		return $comments;
	}

}

?>