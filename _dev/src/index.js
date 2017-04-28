import './assets/sass/index.scss';
import bottle from './services';

console.log( '--globalData--' );
console.log( globalData );
console.log( '--localData--' );
console.log( localData );

$( function() {
	bottle.container.routerController;
} );



