<?php

class Comment_Item {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function get_comment( $wp_comment ) {
		$comment = array();
		
		$comment[ 'id' ] = $wp_comment->comment_ID;
		$comment[ 'author_name' ] = $wp_comment->comment_author;
		$comment[ 'avatar' ] = get_avatar( $wp_comment->user_id, 24, '', $alt = $wp_comment->comment_author, array(
			'class' => 'test'
		) );
		$comment[ 'rating' ] = get_comment_meta( $wp_comment->comment_ID, 'c_rating', true );
		$comment[ 'date' ] = $wp_comment->comment_date;
		$comment[ 'content' ] = apply_filters( 'comment_text', get_comment_text( $wp_comment->comment_ID ), $wp_comment, array() );

		return $comment;
	}
}

?>