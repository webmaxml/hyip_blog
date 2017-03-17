<?php 

class Hyip_Post_Loader {

	private $article_ajax_action = 'post_loader';
	private $article_init_ajax_action = 'init_post_loader';

	private $articles_args = array(
		'post_type' => 'article',
		'posts_per_page' => 2,
	);

	function __construct() {
		add_action( 'wp_ajax_' . $this->article_ajax_action, array( $this, 'article_loading' ) );
		add_action( 'wp_ajax_nopriv_' . $this->article_ajax_action, array( $this, 'article_loading' ) );

		add_action( 'wp_ajax_' . $this->article_init_ajax_action, array( $this, 'initial_article_loading' ) );
		add_action( 'wp_ajax_nopriv_' . $this->article_init_ajax_action, array( $this, 'initial_article_loading' ) );
	}

	function article_loading() {
		$currentPage = isset( $_POST[ 'currentPage' ] ) ? $_POST[ 'currentPage' ] : false;

		if ( $currentPage ) {
			$this->articles_args[ 'paged' ] = ++$currentPage;

			$query = new WP_Query( $this->articles_args );

			ob_start();
			$this->get_posts_html( $query );
			$html = ob_get_contents();
			ob_end_clean();

			$result = array( 'html' => $html );
			wp_send_json_success( $result );
		}
	}

	function initial_article_loading() {
		$initPage = isset( $_POST[ 'initPage' ] ) ? $_POST[ 'initPage' ] : 1;

		$query = new WP_Query( $this->articles_args );
		$max_num_pages = $query->max_num_pages;

		$initPage = $initPage > $max_num_pages ? $max_num_pages : $initPage;
		
		ob_start();

		for ( $i = 1; $i <= $initPage; $i++ ) {
			$this->articles_args[ 'paged' ] = $i;
			$query = new WP_Query( $this->articles_args );

			$this->get_posts_html( $query );
		}
		
		$html = ob_get_contents();
		ob_end_clean();

		$result = array(
			'html' => $html,
			'maxNumPages' => $max_num_pages
		);

		wp_send_json_success( $result );
	}

	function get_posts_html( $query ) {
	if ( $query->have_posts() ) { 

		while ( $query->have_posts() ) {
			$query->the_post(); ?>

			<li class="post-box__item">

				<div class="postHeader">

					<h1 class="postHeader__text">
						<a class="postHeader__link" 
						   href="<?php the_permalink(); ?>"
						   title="<?php the_title_attribute(); ?>">
						   <?php the_title(); ?>
						</a>
					</h1>

					<ul class="postHeader__meta-info">
						<li class="postHeader__meta-item">
							<i class="fa fa-list-ul postHeader__meta-icon"></i>
							<?php the_category( ', ' ); ?>
						</li>
						<li class="postHeader__meta-item">
							<i class="fa fa-calendar postHeader__meta-icon"></i>
							<span class="postHeader__meta-text">
								<?php echo get_the_date(); ?>
							</span>
						</li>
						<li class="postHeader__meta-item">
							<i class="fa fa-comments postHeader__meta-icon"></i>
							<a class="postHeader__meta-link" href="<?php echo get_permalink() . '#comments' ?>">
								<?php echo get_comments_string( get_comments_number() ); ?>
							</a>
						</li>
						<li class="postHeader__meta-item">
							<i class="fa fa-eye postHeader__meta-icon"></i>
							<span class="postHeader__meta-text">
								<?php echo pvc_get_post_views() . ' просмотров' ?>
							</span>
						</li>
					</ul>

				</div>

				<div class="post-box__info-wrap">

					<div class="postThumbnail">
						<a class="postThumbnail__link" href="<?php the_permalink(); ?>">
							<?php the_post_thumbnail( 'thumbnail', array( 'class' => 'postThumbnail__img' ) ); ?>
						</a>
						<ul class="postThumbnail__social">
							<li class="postThumbnail__social-item">
								<a class="postThumbnail__social-link-vk" href="/">
									<i class="fa fa-vk postThumbnail__social-icon"></i>
								</a>
							</li>
							<li class="postThumbnail__social-item">
								<a class="postThumbnail__social-link-facebook" href="/">
									<i class="fa fa-facebook postThumbnail__social-icon"></i>
								</a>
							</li>
							<li class="postThumbnail__social-item">
								<a class="postThumbnail__social-link-twitter" href="/">
									<i class="fa fa-twitter postThumbnail__social-icon"></i>
								</a>
							</li>
							<li class="postThumbnail__social-item">
								<a class="postThumbnail__social-link-google" href="/">
									<i class="fa fa-google-plus postThumbnail__social-icon"></i>
								</a>
							</li>
						</ul>
					</div>

					<div class="postExcerpt">
						<div class="postExcerpt__text-wrap">
							<div class="postExcerpt__text">
								<?php the_excerpt(); ?>
							</div>
						</div>
						<div class="postExcerpt__btn-wrap">
							<a class="postExcerpt__btn" href="<?php echo get_permalink() . '#post' ?>">Читать</a>
						</div>
					</div>

				</div>

			</li>

		<?php }

		wp_reset_postdata();
	} 
}

}

$hyip_post_loader = new Hyip_Post_Loader;

?>