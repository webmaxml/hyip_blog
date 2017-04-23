<li class="<?php echo "hyip-plan-item-" . $plan->ID ?>">
	<label for="<?php echo "hyip-name-" . $plan->ID ?>">Имя</label>
	<input id="<?php echo "hyip-name-" . $plan->ID ?>" 
		   type="text" 
		   name="name"
		   value="<?php echo $plan->post_title; ?>"><br>

	<label for="<?php echo "hyip-payment-percent-" . $plan->ID ?>">Процент выплат</label>
	<input id="<?php echo "hyip-payment-percent-" . $plan->ID ?>" 
		   type="number" 
		   name="payment_percent" 
		   step=0.1 
		   min=0 
		   value="<?php echo get_field( 'payment_percent', $plan->ID ); ?>"><br>

	<label for="<?php echo "hyip-deposit-in-payments-" . $plan->ID ?>">Наличие депозита в выплатах</label>
	<input id="<?php echo "hyip-deposit-in-payments-" . $plan->ID ?>" 
		   type="checkbox" 
		   name="deposit_in_payments" 
		   <?php if ( get_field( 'deposit_in_payments', $plan->ID ) ) { echo 'checked'; } ?>><br>

	<label for="<?php echo "hyip-payment-frequency-" . $plan->ID ?>">Частота выплат в днях</label>
	<input id="<?php echo "hyip-payment-frequency-" . $plan->ID ?>" 
		   type="number" 
		   name="payment_frequency" 
		   step=1 
		   min=0 
		   value="<?php echo get_field( 'payment_frequency', $plan->ID ); ?>"><br>

	<label for="<?php echo "hyip-plan-period-" . $plan->ID ?>">Период в днях</label>
	<input id="<?php echo "hyip-plan-period-" . $plan->ID ?>" 
		   type="number" 
		   name="plan_period" 
		   step=1 
		   min=0 
		   value="<?php echo get_field( 'plan_period', $plan->ID ); ?>"><br>

	<label for="<?php echo "hyip-refback-percent-" . $plan->ID ?>">Процент рефбека</label>
	<input id="<?php echo "hyip-refback-percent-" . $plan->ID ?>" 
		   type="number" 
		   name="refback_percent" 
		   step=0.1 
		   min=0 
		   value="<?php echo get_field( 'refback_percent', $plan->ID ); ?>"><br>

	<label for="<?php echo "hyip-min-deposit-" . $plan->ID ?>">Минимальный вклад</label>
	<input id="<?php echo "hyip-min-deposit-" . $plan->ID ?>" 
		   type="number" 
		   name="min_deposit" 
		   step=1 
		   min=0 
		   value="<?php echo get_field( 'min_deposit', $plan->ID ); ?>"><br>

	<label for="<?php echo "hyip-max-deposit-" . $plan->ID ?>">Максимальный вклад</label>
	<input id="<?php echo "hyip-max-deposit-" . $plan->ID ?>" 
		   type="number" 
		   name="max_deposit" 
		   step=1 
		   min=0 
		   value="<?php echo get_field( 'max_deposit', $plan->ID ); ?>"><br>
	<button class="hyip-plan-update button button-primary button-large" type="button" data-plan-id="<?php echo $plan->ID ?>">Обновить</button>
	<button class="hyip-plan-delete button button-primary button-large" type="button" data-plan-id="<?php echo $plan->ID ?>">Удалить</button>
	<div id="<?php echo "hyip-error-container-" . $plan->ID ?>" class="hyip-error-container"></div>
</li>