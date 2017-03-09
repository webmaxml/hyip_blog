<?php  

global $hyip_config;

// template vars
$top_banner_id = $hyip_config['top_banner']['id'];
$top_banner_size = $hyip_config['top_banner']['thumbnail_size'];
$top_banner_url = get_field( 'url', $top_banner_id );
$top_banner_thumbnail_url = get_the_post_thumbnail_url( $top_banner_id, $top_banner_size );

$user = wp_get_current_user();
$user_avatar = get_avatar( $user->ID, 22 );
$user_cabinet_url = get_page_link( $hyip_config['pages']['cabinet']['id'] );

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700|Roboto+Slab:400,700" rel="stylesheet">
	<style>
		@font-face {
		    font-family: FontAwesome;
		    src: url(<?php echo get_template_directory_uri() . '/fonts/fontAwesome.eot'?>);
		    src: url(<?php echo get_template_directory_uri() . '/fonts/fontAwesome.eot?#iefix&v=4.6.3'?>) format("embedded-opentype"),
		    	 url(<?php echo get_template_directory_uri() . '/fonts/fontAwesome.woff'?>) format("woff"),
		    	 url(<?php echo get_template_directory_uri() . '/fonts/fontAwesome.ttf'?>) format("truetype");
		    font-weight: 400;
		    font-style: normal
		}
		@font-face {
		    font-family: linux-biolinum;
		    src: url(<?php echo get_template_directory_uri() . '/fonts/linux-biolinum.ttf'?>) format("truetype");
		    font-weight: 400;
		    font-style: normal
		}
	</style>
	<?php wp_head(); ?>
</head>
<body>
<!-- BEGIN WRAPPER -->
<div class="wrapper">

		<a class="wrapper__link" 
		   href=<?php echo $top_banner_url; ?> 
		   style="background-image: url( <?php echo $top_banner_thumbnail_url ?> )">
		</a>

		<header class="header">

			<?php get_sidebar( 'logo' ); ?>

        	<button class="header__mobile-menu" type="button" data-modal-trigger="mobileMenu">
        		<i class="fa fa-bars header__mobile-menu-icon"></i>
        	</button>
	        <div class="header__position-wrap">

	        	<?php if ( is_user_logged_in() ) { ?>

					<div class="header__userPanel-wrap">
						<div class="header__user-wrap" data-entity="user">
							<a href="<?php echo $user_cabinet_url; ?>" 
							   class="header__user-name"><?php echo $user->data->user_login; ?></a> 
							<?php echo $user_avatar; ?>
						</div>
						<ul class="header__user-popup" data-entity="popup">
							<li class="header__user-popup-item">
								<a href="<?php echo $user_cabinet_url; ?>" 
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