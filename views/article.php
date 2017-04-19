<div class="post-box__item">

	<div class="postHeader">
		<h1 class="postHeader__text"><?php echo $this->post[ 'title' ][ 'name' ]; ?></h1>
		<ul class="postHeader__meta-info">
			<li class="postHeader__meta-item">
				<i class="fa fa-list-ul postHeader__meta-icon"></i>

				<?php 
					foreach ( $this->post[ 'cats' ] as $cat ) { ?>
						<a class="postHeader__meta-link" 
						   href="<?php echo $cat[ 'href' ]; ?>">
						     <?php echo $cat[ 'name' ] ?>
						</a>
						
						<?php if ( $cat !== end( $this->post[ 'cats' ] ) ) { echo ', '; }
					}
				?>

			</li>
			<li class="postHeader__meta-item">
				<i class="fa fa-calendar postHeader__meta-icon"></i>
				<span class="postHeader__meta-text"><?php echo $this->post[ 'date' ]; ?></span>
			</li>
			<li class="postHeader__meta-item">
				<i class="fa fa-comments postHeader__meta-icon"></i>
				<a class="postHeader__meta-link" 
				   href="#comments">
				   <?php echo $this->post[ 'comments_string' ]; ?>
				</a>
			</li>
			<li class="postHeader__meta-item">
				<i class="fa fa-eye postHeader__meta-icon"></i>
				<span class="postHeader__meta-text">
					<?php echo $this->post[ 'views' ]; ?>
				</span>
			</li>
		</ul>
	</div>

	<div class="post-box__info-wrap">
		<div class="postThumbnail">
			<img class="postThumbnail__img" 
					 src="<?php echo $this->post[ 'thumbnail_url' ]; ?>" 
					 alt="<?php echo $this->post[ 'title' ][ 'title_attr' ]; ?>">
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

		<div class="postContent"><?php echo $this->post[ 'content' ]; ?></div>
	</div>

</div>