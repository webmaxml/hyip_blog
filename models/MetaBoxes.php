<?php

class Meta_Boxes {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance )  ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {}

	public function init() {
		add_action( 'add_meta_boxes', array( $this, 'add_metaboxes' ) );
	}

	public function add_metaboxes() {
		add_meta_box( 'c_rating', 'Рейтинг', array( $this, 'comment_rating_metabox' ), 'comment', 'normal' );
		add_meta_box( 'plans', 'Планы', array( $this, 'plans_metabox' ), 'hyip', 'normal' );
	}

	public function comment_rating_metabox( $comment ) { ?>
	    <div>
	    	Рейтинг комментария - <strong><?php echo get_comment_meta( $comment->comment_ID, 'c_rating', true ); ?></strong>
	    </div>
	<?php }

	public function plans_metabox( $hyip ) { ?>
		<div class="hyip-plans" >
	    	<?php echo $hyip->post_title; ?>
	    	<button id="hyip-addPlan">Создать план</button>
		</div>
	<?php }
	
}

?>