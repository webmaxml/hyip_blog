import React from 'react';
import { render } from 'react-dom';

// init components
import '../components/slider/slider';
import { Tabs } from '../components/tabs/tabs';

let tabs = new Tabs();


export class Test {

	constructor() {
		this.$up = $( document.getElementsByClassName( 'up' )[0] );

		this.$up.on( 'click', function( e ) {
			$("html, body").animate({ scrollTop: 0 }, "slow");
  			return false;
		} )
	}

	init() {

	}

}

