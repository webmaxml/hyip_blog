<?php

// template vars
$title = get_the_title();
$cats_list = get_the_category();

?>

<?php get_header(); ?>

<!-- BEGIN POST -->
<section class="post" id="post">

<div class="post-box__item">

	<div class="postHeader">
		<h1 class="postHeader__text"><?php echo $title; ?></h1>
		<ul class="postHeader__meta-info">
			<li class="postHeader__meta-item">
				<i class="fa fa-list-ul postHeader__meta-icon"></i>

				<?php 
					foreach ($cats_list as $cat) { ?>
						<a class="postHeader__meta-link" 
						   href="<?php echo esc_url( get_category_link( $cat->cat_ID ) ); ?>">
						     <?php echo get_cat_name( $cat->cat_ID ); ?>
						</a>
						
						<?php
						// add coma after elements, except the last one
						if ( $cat !== end( $cats_list ) ) { echo ', '; }
					}
				?>

			</li>
			<li class="postHeader__meta-item">
				<i class="fa fa-calendar postHeader__meta-icon"></i>
				<span class="postHeader__meta-text"><?php echo get_the_date(); ?></span>
			</li>
			<li class="postHeader__meta-item">
				<i class="fa fa-comments postHeader__meta-icon"></i>
				<a class="postHeader__meta-link" 
				   href="#comments">
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
			
			<?php echo get_the_post_thumbnail( $post->ID, 'thumbnail' ); ?>

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

		<div class="postContent">

		<?php 
			$query = new WP_Query( array( 'post_type' => 'article', 'p' => $post->ID ) );

			while( $query->have_posts() ) {
				$query->the_post();


				the_content();
			}
			
			wp_reset_postdata();
		?>
			
		</div>
	</div>

</div>

<pre><?php print_r( $post->ID ); ?></pre>

<!-- END POST -->
</section>

<?php get_footer(); ?>