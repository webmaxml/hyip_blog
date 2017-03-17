<?php /* Template Name: Выборка статей */

// template vars
$ajax_loader_src = get_template_directory_uri() . '/assets/loader.gif';

?>

<?php get_header(); ?>

<!-- BEGIN POST -->
<section class="post" id="post">

	<ul class="post-box blog"></ul>

	<div class="loader">
		<button class="loader__btn" type="button">
			<span class="loader__text">Загрузить еще</span>
			<img class="loader__img" src=<?php echo $ajax_loader_src; ?> alt="Загрузка...">
		</button>
	</div>

<!-- END POST -->
</section>

<?php get_footer(); ?>
   	