import Backbone from 'backbone';

let HyipItemInputView = Backbone.View.extend({

	events: {
		input: 'changeHandler'
	},

	initialize: function( options ) {
		this.listenTo( this.model, 'change:activePlanId', this.render );
	},

	changeHandler: _.debounce( function( e ) {
		console.log( this.$el.val() );
	}, 300 ),

	render: function( model, planId ) {
		let activePlan = _.find( model.get( 'plans' ), plan => planId === plan.id );

		this.$el.val( activePlan.minDeposit );

		return this;
	}


});

export default HyipItemInputView;