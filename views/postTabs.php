<div class="tabs">

    <ul class="tabs__btn-box">
        <li class="tabs__btn-item">
            <button class="tabs__btn" type="button" data-index="1">Популярные</button>
        </li>
        <li class="tabs__btn-item">
            <button class="tabs__btn" type="button" data-index="2">Новые</button>
        </li>
        <li class="tabs__btn-item">
            <button class="tabs__btn" type="button" data-index="3">Комментируемые</button>
        </li>
    </ul>

    <ul class="tabs__pane-box">
        <li class="tabs__pane-item" data-index="1">
            <ul class="tabs__list">
    
                <?php foreach ( $this->views_posts as $post ) { ?>
                        
                <li class="tabs__list-item">
                    <a class="tabs__list-img-link" href="<?php echo $post[ 'link' ] ?>">
                        <img class="tabs__list-img" 
                             src="<?php echo $post[ 'thumbnail_url' ] ?>"
                             alt="<?php echo $post[ 'title' ][ 'title_attr' ] ?>">
                    </a>
                    <div class="tabs__list-info">
                        <h2 class="tabs__list-header">
                            <a class="tabs__list-header-link" href="<?php echo $post[ 'link' ] ?>">
                                <?php echo $post[ 'title' ][ 'name' ] ?>
                            </a>
                        </h2>
                        <div class="tabs__list-meta-info">
                            <i class="fa fa-eye tabs__list-meta-icon"></i>
                            <span class="tabs__list-meta-text"><?php echo $post[ 'views' ] ?></span>
                        </div>
                    </div>
                </li>

                <?php } ?>

            </ul>
        </li>
        <li class="tabs__pane-item" data-index="2">
            <ul class="tabs__list">

                <?php foreach ( $this->new_posts as $post ) { ?>
                        
                <li class="tabs__list-item">
                    <a class="tabs__list-img-link" href="<?php echo $post[ 'link' ] ?>">
                        <img class="tabs__list-img" 
                             src="<?php echo $post[ 'thumbnail_url' ] ?>"
                             alt="<?php echo $post[ 'title' ][ 'title_attr' ] ?>">
                    </a>
                    <div class="tabs__list-info">
                        <h2 class="tabs__list-header">
                            <a class="tabs__list-header-link" href="<?php echo $post[ 'link' ] ?>">
                                <?php echo $post[ 'title' ][ 'name' ] ?>
                            </a>
                        </h2>
                        <div class="tabs__list-meta-info">
                            <i class="fa fa-calendar tabs__list-meta-icon"></i>
                            <span class="tabs__list-meta-text"><?php echo $post[ 'date' ] ?></span>
                        </div>
                    </div>
                </li>

                <?php } ?>
                
            </ul>
        </li>
        <li class="tabs__pane-item" data-index="3">
            <ul class="tabs__list">

                <?php foreach ( $this->comments_posts as $post ) { ?>
                        
                <li class="tabs__list-item">
                    <a class="tabs__list-img-link" href="<?php echo $post[ 'link' ] ?>">
                        <img class="tabs__list-img" 
                             src="<?php echo $post[ 'thumbnail_url' ] ?>"
                             alt="<?php echo $post[ 'title' ][ 'title_attr' ] ?>">
                    </a>
                    <div class="tabs__list-info">
                        <h2 class="tabs__list-header">
                            <a class="tabs__list-header-link" href="<?php echo $post[ 'link' ] ?>">
                                <?php echo $post[ 'title' ][ 'name' ] ?>
                            </a>
                        </h2>
                        <div class="tabs__list-meta-info">
                            <i class="fa fa-comments tabs__list-meta-icon"></i>
                            <span class="tabs__list-meta-text"><?php echo $post[ 'comments_string' ] ?></span>
                        </div>
                    </div>
                </li>

                <?php } ?>
               
            </ul>
        </li>
    </ul>
</div>