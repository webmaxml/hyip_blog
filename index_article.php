<?php /* Template Name: Выборка статей */

// template vars
$ajax_loader_src = get_template_directory_uri() . '/assets/loader.gif';
$page = get_query_var( 'page' ) > 1 ? get_query_var( 'page' ) : 1;

?>

<?php get_header(); ?>

<!-- BEGIN POST -->
<section class="post" id="post">

	<ul class="post-box blog">
		<?php $hyip_articles->get_posts_html_till_page( $page ); ?>
	</ul>

	<div class="loader">
		<button class="loader__btn" type="button">
			<span class="loader__text">Загрузить еще</span>
			<img class="loader__img" src=<?php echo $ajax_loader_src; ?> alt="Загрузка...">
		</button>
	</div>

<!-- END POST -->
</section>

<?php get_footer(); ?>
   	