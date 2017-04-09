<?php

class Article {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->terms = Terms::get_instance();
		$this->comments = Comments::get_instance();
	}

	public function get_post( $post = false ) {
		if ( !$post ) {
			$post = $GLOBALS[ 'post' ];
			the_post();
		}

		$article = array();

		$article[ 'link' ] = get_permalink();
		$article[ 'title' ] = array( 
			'name' => the_title( '', '', false ),
			'title_attr' => the_title_attribute( array( 'echo' => false ) )
		);
		$article[ 'cats' ] = $this->terms->get_link_data( 'category', $post );
		$article[ 'date' ] = get_the_date( get_option( 'date_format' ), $post->ID );
		$article[ 'comments_string' ] = $this->comments->get_comments_string( $post );
		$article[ 'views' ] = pvc_get_post_views( $post->ID ) . ' просмотров';
		$article[ 'thumbnail_tag' ] = get_the_post_thumbnail( $post, 'thumbnail', array( 'class' => 'postThumbnail__img' ) );
		$article[ 'excerpt' ] = apply_filters( 'the_excerpt', get_the_excerpt() );
		
		$content = get_the_content();
		$content = apply_filters( 'the_content', $content );
		$content = str_replace( ']]>', ']]&gt;', $content );

		$article[ 'content' ] = $content;

		return $article;
	}
}

?>