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
				'post_status' => 'publish'
			) ); ?>
	
			<h2>Cписок планов</h2>
			<ul class="hyip-plans-list">

			<?php foreach ( $children as $child ) { ?>
				<li class="<?php echo "hyip-plan-item-" . $child->ID ?>">
					<label for="<?php echo "hyip-name-" . $child->ID ?>">Имя</label>
					<input id="<?php echo "hyip-name-" . $child->ID ?>" 
						   type="text" 
						   name="name"
						   value="<?php echo $child->post_title; ?>"><br>

					<label for="<?php echo "hyip-payment-percent-" . $child->ID ?>">Процент выплат</label>
					<input id="<?php echo "hyip-payment-percent-" . $child->ID ?>" 
						   type="number" 
						   name="payment_percent" 
						   step=0.1 
						   min=0 
						   value="<?php echo get_field( 'payment_percent', $child->ID ); ?>"><br>

					<label for="<?php echo "hyip-deposit-in-payments-" . $child->ID ?>">Наличие депозита в выплатах</label>
					<input id="<?php echo "hyip-deposit-in-payments-" . $child->ID ?>" 
						   type="checkbox" 
						   name="deposit_in_payments" 
						   <?php if ( get_field( 'deposit_in_payments', $child->ID ) ) { echo 'checked'; } ?>><br>

					<label for="<?php echo "hyip-payment-frequency-" . $child->ID ?>">Частота выплат в днях</label>
					<input id="<?php echo "hyip-payment-frequency-" . $child->ID ?>" 
						   type="number" 
						   name="payment_frequency" 
						   step=1 
						   min=0 
						   value="<?php echo get_field( 'payment_frequency', $child->ID ); ?>"><br>

					<label for="<?php echo "hyip-plan-period-" . $child->ID ?>">Период в днях</label>
					<input id="<?php echo "hyip-plan-period-" . $child->ID ?>" 
						   type="number" 
						   name="plan_period" 
						   step=1 
						   min=0 
						   value="<?php echo get_field( 'plan_period', $child->ID ); ?>"><br>

					<label for="<?php echo "hyip-refback-percent-" . $child->ID ?>">Процент рефбека</label>
					<input id="<?php echo "hyip-refback-percent-" . $child->ID ?>" 
						   type="number" 
						   name="refback_percent" 
						   step=0.1 
						   min=0 
						   value="<?php echo get_field( 'refback_percent', $child->ID ); ?>"><br>

					<label for="<?php echo "hyip-min-deposit-" . $child->ID ?>">Минимальный вклад</label>
					<input id="<?php echo "hyip-min-deposit-" . $child->ID ?>" 
						   type="number" 
						   name="min_deposit" 
						   step=1 
						   min=0 
						   value="<?php echo get_field( 'min_deposit', $child->ID ); ?>"><br>

					<label for="<?php echo "hyip-max-deposit-" . $child->ID ?>">Максимальный вклад</label>
					<input id="<?php echo "hyip-max-deposit-" . $child->ID ?>" 
						   type="number" 
						   name="max_deposit" 
						   step=1 
						   min=0 
						   value="<?php echo get_field( 'max_deposit', $child->ID ); ?>"><br>
					<button class="hyip-plan-update button button-primary button-large" type="button" data-plan-id="<?php echo $child->ID ?>">Обновить</button>
					<button class="hyip-plan-delete button button-primary button-large" type="button" data-plan-id="<?php echo $child->ID ?>">Удалить</button>
					<div id="<?php echo "hyip-error-container-" . $child->ID ?>"></div>
				</li>
			<?php } ?>

			</ul>

			<h2>Создать план</h2>

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
	<?php }
	
}

?>