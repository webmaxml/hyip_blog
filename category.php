<?php get_header(); ?>

	<div class="wrapper">
		<?php $view->get( 'topBanner' ); ?>
		<?php $view->get( 'header' ); ?>
		<?php $view->get( 'mainMenu' ); ?>
		<main class="main">
			<section class="post" id="post">
				<?php $view->get( 'articleIndex' ); ?>
			</section>
			<aside class="sidebar">
				<?php $view->get( 'categories' ); ?>
				<?php $view->get( 'postTabs' ); ?>
				<?php $view->get( 'subscribe' ); ?>
			</aside>
		</main>
	</div>
	<?php $view->get( 'modals' ); ?>

<?php get_footer(); ?>