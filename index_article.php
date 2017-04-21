<?php /* Template Name: Выборка статей */

$args = array(
	'name' => 'Silver',
	'payment_percent' => 2,
	'deposit_in_payments' => true,
	'payment_frequency' => 1,
	'plan_period' => 75,
	'refback_percent' => 5,
	'min_deposit' => 10,
	'max_deposit' => 299
);

$plan = Hyip_Plan::get_instance();

?>

<?php get_header(); ?>

	<!-- <pre><?php print_r(); ?></pre> -->

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