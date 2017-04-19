<?php /* Template Name: Выборка статей */ ?>

<?php get_header(); ?>

	<pre><?php print_r( get_post( 53 ) ); ?></pre>
	<pre>ДЕТИ</pre>
	<pre><?php print_r( get_children( array( 'post_type' => 'plan', 'post_parent' => 53  ) ) ); ?></pre>
	<pre>Поле</pre>
	<pre><?php print_r( get_field( 'hyip_plan', 53 ) ); ?></pre>

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