<header class="header">

	<?php get_sidebar( 'logo' ); ?>

	<button class="header__mobile-menu" type="button" data-modal-trigger="mobileMenu">
		<i class="fa fa-bars header__mobile-menu-icon"></i>
	</button>
    <div class="header__position-wrap">

    	<?php if ( is_user_logged_in() ) { ?>

			<div class="header__userPanel-wrap">
				<div class="header__user-wrap" data-entity="user">
					<a href="<?php echo $this->user_cabinet_url; ?>" 
					   class="header__user-name"><?php echo $this->user->data->user_login; ?></a> 
					<?php echo $this->user_avatar; ?>
				</div>
				<ul class="header__user-popup" data-entity="popup">
					<li class="header__user-popup-item">
						<a href="<?php echo $this->user_cabinet_url; ?>" 
						   class="header__user-popup-link">Личный кабинет</a>
					</li>
					<li class="header__user-popup-item">
						<a href="<?php echo wp_logout_url( get_permalink() ); ?>" 
						   class="header__user-popup-link">Выход</a>
					</li>
				</ul>
			</div>

    	<?php } else { ?>

    		<div class="header__reg-wrap">
				<button class="header__reg" type="button" data-modal-trigger="registration">Регистрация</button>
				<button class="header__log" type="button" data-modal-trigger="login">Вход</button>
			</div>

    	<?php } ?>

    </div>

</header>