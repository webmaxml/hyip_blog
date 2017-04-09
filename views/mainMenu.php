<nav class="main-menu">

	<?php 

	wp_nav_menu( array(
		'theme_location' => 'main_menu',
		'container' => false,
		'menu_class' => 'main-menu__nav',
		'fallback_cb' => false,
		'items_wrap' => '<ul class="%2$s">%3$s</ul>'
	)); 

	?>

	<form class="main-menu__search">
		<input class="main-menu__search-input" type="text" placeholder="Поиск">
		<button class="main-menu__search-btn">
			<i class="fa fa-search main-menu__search-icon"></i>
		</button>
	</form>
	
</nav>