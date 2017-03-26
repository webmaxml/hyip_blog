<?php /* Template Name: Выборка статей */ ?>

<!DOCTYPE html>
<html>
<head>
	<?php $view->get( 'head' ); ?>
</head>
<body>

	<div class="wrapper">
		<?php $view->get( 'topBanner' ); ?>
		<?php $view->get( 'header' ); ?>
		<?php $view->get( 'mainMenu' ); ?>
		<main class="main">
			<section class="post" id="post">
				<?php $view->get( 'postIndex' ); ?>
			</section>
			<aside class="sidebar">
				<?php $view->get( 'categories' ); ?>
				<?php $view->get( 'postTabs' ); ?>
				<?php $view->get( 'subscribe' ); ?>
			</aside>
		</main>
	</div>
	<?php $view->get( 'modals' ); ?>

<?php wp_footer(); ?>
</body>
</html>