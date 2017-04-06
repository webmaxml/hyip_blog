import Backbone from 'backbone';

let ModalItem = Backbone.Model.extend({

	defaults: {
		id: null,
		active: false
	}

});

let Modals = Backbone.Model.extend({

	defaults: {
		modalList: []
	},

	addModal: function( id ) {
		let modalList = this.get( 'modalList' );
		let existingModal = _.find( modalList, modal => modal.id === id );

		if ( existingModal ) { 
			return existingModal; 
		}

		let modal = new ModalItem({ id });

		modalList.push( modal );
		this.set({ modalList });

		return modal;
	}

});

export default Modals;