jQuery( function( $ ) {

	$( '#hyip-addPlan' ).on( 'click', function( event ) {
		event.preventDefault();

		var $btn = $( this );
		var $errorContainer = $( '#hyip-error-container' );

		$btn.text( 'Создается...' );
		$errorContainer.text( '' );

		$.ajax({
			url: globalData.ajaxUrl,
			type: 'POST',
			dataType: 'json',
			data: {
				action: 'hyip_add_plan',
				_wpnonce: $( '#_plan_wpnonce' ).val(),
				name: $( '#hyip-name' ).val(),
				payment_percent: $( '#hyip-payment-percent' ).val(),
				deposit_in_payments: $( '#hyip-deposit-in-payments' ).prop( 'checked' ),
				payment_frequency: $( '#hyip-payment-frequency' ).val(),
				plan_period: $( '#hyip-plan-period' ).val(),
				refback_percent: $( '#hyip-refback-percent' ).val(),
				min_deposit: $( '#hyip-min-deposit' ).val(),
				max_deposit: $( '#hyip-max-deposit' ).val(),
				hyip_id: hyip_id
			},
			success: function( data ) {
				$btn.text( 'Создать план' );
				
				if ( data.success ) {
					$errorContainer.text( 'Создание прошло успешно' );
				} else {
					$errorContainer.text( data.data );
				}
			},
			error: function( xhr, status, error ) {
				$btn.text( 'Создать план' );
				$errorContainer.text( error );
			}
		});
	} );


	$( '.hyip-plan-update' ).on( 'click', function( event ) {
		event.preventDefault();

		var $btn = $( this );
		var planId = +$btn.data( 'plan-id' );
		var $errorContainer = $( '#hyip-error-container-' + planId );

		$btn.text( 'Обновляется...' );
		$errorContainer.text( '' );

		$.ajax({
			url: globalData.ajaxUrl,
			type: 'POST',
			dataType: 'json',
			data: {
				action: 'hyip_update_plan',
				_wpnonce: $( '#_plan_wpnonce' ).val(),
				plan_id: planId, 
				name: $( '#hyip-name-' + planId ).val(),
				payment_percent: $( '#hyip-payment-percent-' + planId ).val(),
				deposit_in_payments: $( '#hyip-deposit-in-payments-' + planId ).prop( 'checked' ),
				payment_frequency: $( '#hyip-payment-frequency-' + planId ).val(),
				plan_period: $( '#hyip-plan-period-' + planId ).val(),
				refback_percent: $( '#hyip-refback-percent-' + planId ).val(),
				min_deposit: $( '#hyip-min-deposit-' + planId ).val(),
				max_deposit: $( '#hyip-max-deposit-' + planId ).val(),
				hyip_id: hyip_id
			},
			success: function( data ) {
				$btn.text( 'Обновить' );
				
				if ( data.success ) {
					$errorContainer.text( 'Обновление прошло успешно' );
				} else {
					$errorContainer.text( data.data );
				}
			},
			error: function( xhr, status, error ) {
				$btn.text( 'Обновить' );
				$errorContainer.text( error );
			}
		});
	} );

	$( '.hyip-plan-delete' ).on( 'click', function( event ) {
		event.preventDefault();

		var $btn = $( this );
		var planId = +$btn.data( 'plan-id' );
		var $errorContainer = $( '#hyip-error-container-' + planId );

		$btn.text( 'Удаляется...' );
		$errorContainer.text( '' );

		$.ajax({
			url: globalData.ajaxUrl,
			type: 'POST',
			dataType: 'json',
			data: {
				action: 'hyip_delete_plan',
				_wpnonce: $( '#_plan_wpnonce' ).val(),
				plan_id: planId
			},
			success: function( data ) {
				$btn.text( 'Удалить' );
				
				if ( data.success ) {
					$( '.hyip-plan-item-' + planId ).html('');
				} else {
					$errorContainer.text( data.data );
				}
			},
			error: function( xhr, status, error ) {
				$btn.text( 'Удалить' );
				$errorContainer.text( error );
			}
		});
	} );

} );