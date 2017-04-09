<div class="categories">
    <div class="sectionHeader">
        <div class="sectionHeader__line-left"></div>
        <h1 class="sectionHeader__text">Разделы</h1>
        <div class="sectionHeader__line-right"></div>
    </div>
    
    <ul class="categories__item-box">
    	
		<?php foreach ( $this->cats as $cat) { ?>
	
			<li class="categories__item">
			    <a class="categories__item-link" href="<?php echo $cat[ 'href' ]; ?>">
			        <?php echo $cat[ 'name' ]; ?>
			    </a>
			</li>

		<?php } ?>

    </ul>
</div>