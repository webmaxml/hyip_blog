<?php

$articles_args = array(
	'post_type' => 'article',
	'posts_per_page' => 2,
);

$articles_query = new WP_Query( $articles_args );

require 'config/config.php';
require 'inc/theme_setup.php';
require 'inc/registration.php';
require 'inc/login.php';
require 'widgets/Logo.php';

function get_comments_string( $comments_num ) {
	switch ( $comments_num ) {
		case 0:
			return '0 комментариев';
		case 1:
			return '1 комментарий';
		default:
			return $comments_num . ' комментариев';
	}
}

function hyip_post_loading() {
	$currentPage = isset( $_POST[ 'currentPage' ] ) ? $_POST[ 'currentPage' ] : false;

	global $articles_args;
	$articles_args[ 'paged' ] = ++$currentPage;

	$query = new WP_Query( $articles_args );

	ob_start();

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

	$result = ob_get_contents();
	ob_end_clean();
	wp_send_json_success( $result );
}

add_action( 'wp_ajax_post_loader', 'hyip_post_loading' );


?>