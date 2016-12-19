import 'babel-polyfill';
import './sass/index.scss';
import container from './services';

let App = container.get( 'app' );

$( function() {
	App.init();
} )
