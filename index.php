<?php get_header() ?>

	<div class="wrapper">

		<a class="wrapper__link" 
		   href=<?php echo get_field( 'url', $hyip_config['top_banner']['id'] ); ?> 
		   style="background-image: url( <?php 
		   		echo get_the_post_thumbnail_url( $hyip_config['top_banner']['id'], 
		   										 $hyip_config['top_banner']['thumbnail_size'] ); 
		   		?> )">
		</a>

		<header class="header">
			<a class="header__logo" href="/">
				<b class="header__logo-accent">hyip</b>odrom
			</a>
        	<button class="header__mobile-menu" type="button" data-modal-trigger="mobileMenu">
        		<i class="fa fa-bars header__mobile-menu-icon"></i>
        	</button>
	        <div class="header__position-wrap">

	        	<?php if ( is_user_logged_in() ) { ?>

					<div class="header__userPanel-wrap">
						<div class="header__user-wrap" data-entity="user">
							<a href="<?php echo get_page_link( $hyip_config['pages']['cabinet']['id'] ) ?>"
							   class="header__user-name">Keanu Reeves</a> 
							<img src="" alt="" class="header__user-avatar">
						</div>
						<ul class="header__user-popup" data-entity="popup">
							<li class="header__user-popup-item">
								<a href="<?php echo get_page_link( $hyip_config['pages']['cabinet']['id'] ) ?>" 
								   class="header__user-popup-link">Личный кабинет</a>
							</li>
							<li class="header__user-popup-item">
								<a href="/" class="header__user-popup-link">Выход</a>
							</li>
						</ul>
					</div>

	        	<?php } else { ?>

	        		<div class="header__reg-wrap">
						<button class="header__reg" type="button" data-modal-trigger="registration">Регистрация</button>
						<a class="header__log" href="/user.html">Вход</a>
					</div>

	        	<?php } ?>

	        </div>
      </header>
     </div>

   	<?php get_template_part( 'partials/modals' ); ?>
	
<?php wp_footer(); ?>
</body>
</html>
