<?php 

class Hyip_Articles {

	private $query_args = array(
		'post_type' => 'article',
		'posts_per_page' => 2,
	);

	private $max_num_pages;

	private $ajax_action = 'post_loader';

	function __construct() {
		add_action( 'wp_ajax_' . $this->ajax_action, array( $this, 'ajax_load_next_page' ) );
		add_action( 'wp_ajax_nopriv_' . $this->ajax_action, array( $this, 'ajax_load_next_page' ) );
	}

	public function get_query_args() {
		return $this->query_args;
	}

	public function get_max_pages() {
		if ( !isset( $this->max_num_pages ) ) {
			$query = new WP_Query( $this->query_args );
			$this->max_num_pages = $query->max_num_pages;
		}

		return $this->max_num_pages;
	}

	public function ajax_load_next_page() {
		$currentPage = isset( $_POST[ 'currentPage' ] ) ? $_POST[ 'currentPage' ] : false;

		if ( $currentPage ) {
			$args = $this->query_args;
			$args[ 'paged' ] = ++$currentPage;

			ob_start();
			$this->get_posts_html( $args );
			$html = ob_get_contents();
			ob_end_clean();

			$result = array( 'html' => $html );
			wp_send_json_success( $result );
		}
	}

	public function get_posts_html_till_page( $page ) {
		$page = $page > $this->get_max_pages() ? $this->get_max_pages() : $page;
		$args = $this->query_args;

		for ( $i = 1; $i <= $page; $i++ ) {
			$args[ 'paged' ] = $i;
			$this->get_posts_html( $args );
		}
	}

	public function get_posts_html( $args ) {

		if ( !isset( $args ) ) { $args = $this->query_args; }

		$query = new WP_Query( $args );

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

$hyip_articles = new Hyip_Articles;

?>