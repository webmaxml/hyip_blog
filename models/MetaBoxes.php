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
			<script>var hyip_id = <?php echo $hyip->ID; ?>;</script>

			<?php wp_nonce_field( 'hyip_plan_proccessing', '_plan_wpnonce', false ); ?>
	
			<?php 
			$children = get_children( array( 
				'post_type' => 'plan', 
				'post_parent' => $hyip->ID,
				'post_status' => 'publish',
				'order' => 'ASC'
			) ); 

			$plansList = array();
			foreach ( $children as $plan ) {
				ob_start();
				require '/../views/metaBoxPlan.php';
				$plansList[] = array(
					'id' => $plan->ID,
					'html' => ob_get_contents()
				);
				ob_end_clean();
			} ?>

			<script>var hyipPlansList = <?php echo json_encode( $plansList ) ?>;</script>
	
			<h2>Cписок планов</h2>
			<ul class="hyip-plans-list"></ul>

			<h2>Создать план</h2>

			<div class="hyip-add-plan-form">

				<label for="hyip-name">Имя</label>
				<input id="hyip-name" type="text" name="name"><br>

				<label for="hyip-payment-percent">Процент выплат</label>
				<input id="hyip-payment-percent" type="number" name="payment_percent" step=0.1 min=0 value=0><br>

				<label for="hyip-deposit-in-payments">Наличие депозита в выплатах</label>
				<input id="hyip-deposit-in-payments" type="checkbox" name="deposit_in_payments" checked><br>

				<label for="hyip-payment-frequency">Частота выплат в днях</label>
				<input id="hyip-payment-frequency" type="number" name="payment_frequency" step=1 min=0 value=1><br>

				<label for="hyip-plan-period">Период в днях</label>
				<input id="hyip-plan-period" type="number" name="plan_period" step=1 min=0 value=1><br>

				<label for="hyip-refback-percent">Процент рефбека</label>
				<input id="hyip-refback-percent" type="number" name="refback_percent" step=0.1 min=0 value=0><br>

				<label for="hyip-min-deposit">Минимальный вклад</label>
				<input id="hyip-min-deposit" type="number" name="min_deposit" step=1 min=0 value=1><br>

				<label for="hyip-max-deposit">Максимальный вклад</label>
				<input id="hyip-max-deposit" type="number" name="max_deposit" step=1 min=0 value=1><br>

		    	<button id="hyip-addPlan" class="button button-primary button-large">Создать план</button>

		    	<div id="hyip-error-container"></div>

	    	</div>
		</div>
	<?php }
	
}

?>