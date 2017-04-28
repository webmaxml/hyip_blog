jQuery( function( $ ) {

	//------------------------ Models ---------------------------

	var Plan = Backbone.Model.extend({

		defaults: {
			state: 'pending',
			html: null,
			error: ''
		},

		deletePlan: function() {
			this.set({ error: '' });
			this.set({ state: 'deleting' });

			$.ajax({
				url: globalData.ajaxUrl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'hyip_delete_plan',
					_wpnonce: $( '#_plan_wpnonce' ).val(),
					plan_id: this.id
				},
				success: function( data ) {
					if ( !_.has( data, 'success' ) ) {
						console.warn( 'ajax data must be object with success property' );
					}

					if ( data.success ) {
						this.trigger( 'deleted', this );
					} else {
						if ( typeof data.data !== 'string' ) {
							console.warn( 'ajax error must be string' );
						}

						this.set({ error: data.data });
					}

					this.set({ state: 'pending' });
				}.bind( this ),
				error: function( xhr, status, error ) {
					this.set({ error: error });
					this.set({ state: 'pending' });
				}.bind( this )
			});
		},

		updatePlan: function() {
			this.set({ error: '' });
			this.set({ state: 'updating' });

			$.ajax({
				url: globalData.ajaxUrl,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'hyip_update_plan',
					_wpnonce: $( '#_plan_wpnonce' ).val(),
					plan_id: this.id, 
					name: $( '#hyip-name-' + this.id ).val(),
					payment_percent: $( '#hyip-payment-percent-' + this.id ).val(),
					deposit_in_payments: $( '#hyip-deposit-in-payments-' + this.id ).prop( 'checked' ),
					payment_frequency: $( '#hyip-payment-frequency-' + this.id ).val(),
					plan_period: $( '#hyip-plan-period-' + this.id ).val(),
					refback_percent: $( '#hyip-refback-percent-' + this.id ).val(),
					min_deposit: $( '#hyip-min-deposit-' + this.id ).val(),
					max_deposit: $( '#hyip-max-deposit-' + this.id ).val(),
					hyip_id: hyip_id
				},
				success: function( data ) {
					if ( !_.has( data, 'success' ) || !_.has( data, 'data' ) ) {
						console.warn( 'ajax data must be object with success and data properties' );
					}

					if ( data.success ) {
						if ( !_.has( data.data, 'html' ) ) {
							console.warn( 'ajax data for updating plan must be object with html property' );
						}

						this.set({ html: data.data.html });
					} else {
						if ( typeof data.data !== 'string' ) {
							console.warn( 'ajax error must be string' );
						}

						this.set({ error: data.data });
					}

					this.set({ state: 'pending' });
				}.bind( this ),
				error: function( xhr, status, error ) {
					this.set({ error: error });
					this.set({ state: 'pending' });
				}.bind( this )
			});
		}

	});

	var PlansList = Backbone.Model.extend({

		defaults: {
			loading: false,
			plans: [],
			error: ''
		},

		addPlan: function() {
			this.set({ error: '' });
			this.set({ loading: true });

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
					if ( !_.has( data, 'success' ) || !_.has( data, 'data' ) ) {
						console.warn( 'ajax data must be object with success and data properties' );
					}

					if ( data.success ) {
						if ( !_.has( data.data, 'id' ) || !_.has( data.data, 'html' ) ) {
							console.warn( 'ajax data for adding plan must be object with id and html properties' );
						}

						this.createNewPlan( data.data );
					} else {
						if ( typeof data.data !== 'string' ) {
							console.warn( 'ajax error must be string' );
						}

						this.set({ error: data.data });
					}

					this.set({ loading: false });
				}.bind( this ),
				error: function( xhr, status, error ) {
					this.set({ error: error });
					this.set({ loading: false });
				}.bind( this )
			});
		},

		createNewPlan: function( planData ) {
			if ( !_.has( planData, 'id' ) || !_.has( planData, 'html' ) ) {
				console.warn( 'data for creating new plan must be object with id and html properties' );
			}

			var newPlan = new Plan( planData );
			var plans = _.clone( this.get( 'plans' ) );

			this.listenTo( newPlan, 'deleted', this.deletePlanFromList );
			this.trigger( 'newPlan', newPlan );

			plans.push( newPlan );
			this.set({ plans: plans });
		},

		deletePlanFromList: function( plan ) {
			if ( !_.isObject( plan ) ) {
				console.warn( 'plan must be an object' );
			}

			this.stopListening( plan );

			this.set({ plans: _.without( this.get( 'plans' ), plan ) });
			this.trigger( 'deletePlan', plan );
		},

	});


	//------------------------ Controllers ---------------------------

	// PlansListController

	function PlansListController( plansList ) {
		_.extend( this, Backbone.Events );

		this.plansList = plansList;
		this.planControllers = {};

		var plansListContainer = document.getElementsByClassName( 'hyip-plans-list' )[0];
		var addPlanForm = document.getElementsByClassName( 'hyip-add-plan-form' )[0];

		if ( !_.isElement( plansListContainer ) || !_.isElement( addPlanForm ) ) {
			console.warn( 'plansListContainer or addPlanForm is not a DOM element' );
		}

		this.plansListView = new PlansListView({ el: plansListContainer, controller: this });
		this.addPlanFormView = new AddPlanFormView({ el: addPlanForm, controller: this });

		this.listenTo( this.plansList, 'change:loading', this.setLoading );
		this.listenTo( this.plansList, 'change:error', this.setError );
		this.listenTo( this.plansList, 'newPlan', this.createSet );
		this.listenTo( this.plansList, 'deletePlan', this.deleteSet );
	};

	PlansListController.prototype.handleClick = function( event ) {
		event.preventDefault();
		this.plansList.addPlan();
	};

	PlansListController.prototype.setLoading = function( model, loading ) {
		if ( loading ) {
			this.addPlanFormView.showLoader();
		} else {
			this.addPlanFormView.hideLoader();
		}
	};

	PlansListController.prototype.setError = function( model, error ) {
		this.addPlanFormView.showError( error );
	};

	PlansListController.prototype.createSet = function( plan ) {
		this.planControllers[ plan.id ] = new PlanController( plan, this.plansListView );
	};

	PlansListController.prototype.deleteSet = function( plan ) {
		this.planControllers[ plan.id ].delete();
		delete this.planControllers[ plan.id ];
	};

	// PlanController

	function PlanController( plan, plansListView ) {
		_.extend( this, Backbone.Events );

		this.plan = plan;
		this.plansListView = plansListView;

		var el = this.plansListView.appendPlan( plan.get( 'html' ) );

		if ( !_.isElement( el ) ) {
			console.warn( 'planView el is not a DOM element' );
		}

		this.planView = new PlanView({ el: el, controller: this });

		this.listenTo( this.plan, 'change:html', this.setUpdate );
		this.listenTo( this.plan, 'change:state', this.setStateChange );
		this.listenTo( this.plan, 'change:error', this.setError );
	};

	PlanController.prototype.handleUpdateClick = function( event ) {
		event.preventDefault();
		this.plan.updatePlan();
	};

	PlanController.prototype.handleDeleteClick = function( event ) {
		event.preventDefault();
		this.plan.deletePlan();
	};

	PlanController.prototype.setUpdate = function( model, planHtml ) {
		this.planView.delete();

		var el = this.plansListView.replacePlan( this.planView.el, planHtml );

		if ( !_.isElement( el ) ) {
			console.warn( 'planView el is not a DOM element' );
		}

		this.planView = new PlanView({ el: el, controller: this });
	};

	PlanController.prototype.setStateChange = function( model, state ) {
		switch ( state ) {
			case 'deleting':
				this.planView.showDeleteLoading();
				break;
			case 'updating':
				this.planView.showUpdateLoading();
				break;
			default:
				this.planView.hideLoading();
				break;
		}
	};

	PlanController.prototype.setError = function( model, error ) {
		this.planView.showError( error );
	};

	PlanController.prototype.delete = function() {
		this.stopListening( this.plan );
		this.planView.delete();
		this.planView = null;
	};


	//------------------------ Views ---------------------------

	// AddPlanFormView

	var AddPlanFormView = Backbone.View.extend({

		events: {
			'click #hyip-addPlan': 'handleClick'
		},

		handleClick: function( e ) { this.controller.handleClick( e ); },

		initialize: function( attrs ) {
			this.controller = attrs.controller;

			this.$addButton = this.$el.find( '#hyip-addPlan' );
			this.$errorContainer = this.$el.find( '#hyip-error-container' );
		},

		showLoader: function() {
			this.$addButton.text( 'Создается...' );
		},

		hideLoader: function() {
			this.$addButton.text( 'Создать план' );
		},

		showError: function( error ) {
			this.$errorContainer.text( error );
		}

	});

	// PlansListView

	var PlansListView = Backbone.View.extend({

		appendPlan: function( plan ) {
			if ( !_.isElement( plan ) && typeof plan !== 'string' ) {
				console.warn( 'plan for appending to plansList container must be htmlstring or DOM object' );
			}

			return $( plan ).hide().appendTo( this.el ).fadeIn( 'slow' ).get( 0 );				 
		},

		replacePlan: function( oldPlan, newPlan ) {
			if ( !_.isElement( oldPlan ) && typeof oldPlan !== 'string' ||
				 !_.isElement( newPlan ) && typeof newPlan !== 'string') {
				console.warn( 'plans for replacing in plansList container must be htmlstring or DOM object' );
			}

			return $( newPlan ).hide().replaceAll( oldPlan ).fadeIn( 'slow' ).get( 0 );				 
		}
		
	});

	// PlanView

	var PlanView = Backbone.View.extend({

		events: {
			'click .hyip-plan-update': 'handleUpdateClick',
			'click .hyip-plan-delete': 'handleDeleteClick'
		},

		handleUpdateClick: function( e ) { this.controller.handleUpdateClick( e ) },
		handleDeleteClick: function( e ) { this.controller.handleDeleteClick( e ) },

		initialize: function( attrs ) {
			this.controller = attrs.controller;

			this.$updateButton = this.$el.find( '.hyip-plan-update' );
			this.$deleteButton = this.$el.find( '.hyip-plan-delete' );
			this.$errorContainer = this.$el.find( '.hyip-error-container' );
		},

		showUpdateLoading: function() {
			this.$updateButton.text( 'Обновляется...' );
		},

		showDeleteLoading: function() {
			this.$deleteButton.text( 'Удаляется...' );
		},

		hideLoading: function() {
			this.$updateButton.text( 'Обновить' );
			this.$deleteButton.text( 'Удалить' );
		},

		showError: function( error ) {
			this.$errorContainer.text( error );
		},

		delete: function() {
			this.undelegateEvents();
			this.$el.fadeOut( 'fast', function() {
				this.$el.html('');
			}.bind( this ) )
		}

	});


	//------------------------ Initialization ---------------------------

	if ( typeof hyipPlansList !== 'undefined' ) {

		if ( !Array.isArray( hyipPlansList ) ) {
			console.warn( 'hyipPlanList must be an array' );
		}

		var plansList = new PlansList();
		var plansListController = new PlansListController( plansList );

		hyipPlansList.forEach( function( plan ) {
			plansList.createNewPlan( plan );
		} );
	}

	
} );