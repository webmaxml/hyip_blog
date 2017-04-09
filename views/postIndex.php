<script>localData.maxPages = <?php echo $this->max_num_pages; ?>;</script>

<ul class="post-box blog"><?php echo $this->posts; ?></ul>

<div class="loader">
	<button class="loader__btn" type="button">
		<span class="loader__text">Загрузить еще</span>
		<img class="loader__img" src=<?php echo $this->ajax_loader_src ?> alt="Загрузка...">
	</button>
</div>