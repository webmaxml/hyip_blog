<?php /* Template Name: Home */ 

// template vars



?>

<?php get_header() ?>
	
<!-- END WRAPPER -->
</div>

<!-- main-->
<main class="main">
	<!-- post-->
	<section class="post" id="post">
		
		<?php 

			$args = array(
						'post_type' => 'article'
					);

			$query = new Wp_Query( $args );

			if ( $query->have_posts() ) { 

				echo '<ul class="post-box blog">';

				while ( $query->have_posts() ) {
					$query->the_post();

					?>

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
										<?php comments_number( '0 комментариев', '1 комментарий', '% комментариев' ); ?>
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
									<p class="postExcerpt__text">
										<?php the_excerpt(); ?>
									</p>
								</div>
								<div class="postExcerpt__btn-wrap">
									<a class="postExcerpt__btn" href="<?php echo get_permalink() . '#post' ?>">Читать</a>
								</div>
							</div>

						</div>

					</li>

					<?php
				}

				echo '</ul>';

				wp_reset_postdata();
			}


		?>
		

			<!-- <li class="post-box__item">

				<div class="postHeader">
					<h1 class="postHeader__text">
						<a class="postHeader__link" href="/post.html#post">Hyipodrom.com - не просто TOP, а топовый во всём всего за год! Только факты, без флуда!</a>
					</h1>
					<ul class="postHeader__meta-info">
						<li class="postHeader__meta-item">
							<a class="postHeader__meta-link" href="/">
								<i class="fa fa-list-ul postHeader__meta-icon"></i>
								Новичкам
							</a>
						</li>
						<li class="postHeader__meta-item">
							<span class="postHeader__meta-text">
								<i class="fa fa-calendar postHeader__meta-icon"></i>
								12.11.2016
							</span>
						</li>
						<li class="postHeader__meta-item">
							<a class="postHeader__meta-link" href="/post.html#comments">
								<i class="fa fa-comments postHeader__meta-icon"></i>
								146 комментариев
							</a>
						</li>
						<li class="postHeader__meta-item">
							<span class="postHeader__meta-text">
								<i class="fa fa-eye postHeader__meta-icon"></i>
								546 просмотров
							</span>
						</li>
					</ul>
				</div>

				<div class="post-box__info-wrap">

					<div class="postThumbnail">
						<a class="postThumbnail__link" href="/post.html#post">
							<img class="postThumbnail__img" src="/img/post_image.jpg?7166f708c60900f6213763447b614b9d">
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
							<p class="postExcerpt__text">Предлагаю всем, кто читает этот блог, посмотреть на наши с Вами достижения! Конечно, главные здесь инвесторы и без Вас, это всё невозможно! Вы вместе с нами топы и всем здесь заправляете :) Впереди еще много времени, не словом, а делом :) Предлагаю всем, кто читает этот блог, посмотреть на наши с Вами достижения! Конечно, главные здесь инвесторы и без Вас, это всё невозможно!</p>
						</div>
						<div class="postExcerpt__btn-wrap">
							<a class="postExcerpt__btn" href="/post.html#post">Читать</a>
						</div>
					</div>

				</div>
			</li> -->

		<!-- loader-->
		<div class="loader">
			<button class="loader__btn" type="button">Загрузить еще</button>
		</div>

   	<?php get_template_part( 'partials/modals' ); ?>
	
<?php wp_footer(); ?>
</body>
</html>