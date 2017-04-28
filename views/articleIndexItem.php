<li class="post-box__item" data-item-id="<?php echo $item[ 'id' ]; ?>">

	<div class="postHeader">

		<h1 class="postHeader__text">
			<a class="postHeader__link" 
			   href="<?php echo $item[ 'link' ]; ?>"
			   title="<?php echo $item[ 'title' ][ 'title_attr' ]; ?>">
			   <?php echo $item[ 'title' ][ 'name' ]; ?>
			</a>
		</h1>

		<ul class="postHeader__meta-info">
			<li class="postHeader__meta-item">
				<i class="fa fa-list-ul postHeader__meta-icon"></i>

				<?php 

					foreach ( $item[ 'cats' ] as $cat ) { ?>

						<a class="postHeader__meta-link" 
						   href="<?php echo $cat[ 'href' ]; ?>">
						     <?php echo $cat[ 'name' ]; ?>
						</a>
						
						<?php if ( $cat !== end( $item[ 'cats' ] ) ) { echo ', '; }
					}
				?>

			</li>
			<li class="postHeader__meta-item">
				<i class="fa fa-calendar postHeader__meta-icon"></i>
				<span class="postHeader__meta-text">
					<?php echo $item[ 'date' ]; ?>
				</span>
			</li>
			<li class="postHeader__meta-item">
				<i class="fa fa-comments postHeader__meta-icon"></i>
				<a class="postHeader__meta-link" href="<?php echo $item[ 'link' ] . '#comments' ?>">
					<?php echo $item[ 'comments_string' ]; ?>
				</a>
			</li>
			<li class="postHeader__meta-item">
				<i class="fa fa-eye postHeader__meta-icon"></i>
				<span class="postHeader__meta-text">
					<?php echo $item[ 'views' ]; ?>
				</span>
			</li>
		</ul>

	</div>

	<div class="post-box__info-wrap">

		<div class="postThumbnail">
			<a class="postThumbnail__link" href="<?php echo $item[ 'link' ]; ?>">
				<img class="postThumbnail__img" 
					 src="<?php echo $item[ 'thumbnail_url' ]; ?>" 
					 alt="<?php echo $item[ 'title' ][ 'title_attr' ]; ?>">
			</a>
			<ul class="postThumbnail__social">
				<li class="postThumbnail__social-item">
					<div class="postThumbnail__social-link-vk">						
						<script type="text/javascript">
							localData.social[ "vk-<?php echo $item[ 'id' ]; ?>" ] = VK.Share.button({
								url: "<?php echo $item[ 'link' ]; ?>",
								title: "<?php echo $item[ 'title' ][ 'name' ]; ?>",
								image: "<?php echo $item[ 'thumbnail_url' ]; ?>",
								noparse: true
							},{
								type: 'custom',
								text: '<i class="fa fa-vk postThumbnail__social-icon"></i>'
							});
						</script>
					</div>
				</li>
				<li class="postThumbnail__social-item">
					<a class="postThumbnail__social-link-twitter" 
					   href="https://twitter.com/intent/tweet?url=<?php echo $item[ 'link' ]; ?>">
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
					<?php echo $item[ 'excerpt' ]; ?>
				</div>
			</div>
			<div class="postExcerpt__btn-wrap">
				<a class="postExcerpt__btn" href="<?php echo $item[ 'link' ] . '#post' ?>">Читать</a>
			</div>
		</div>

	</div>

</li>