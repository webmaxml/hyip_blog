import 'babel-polyfill';
import container from './services';

let App = container.get( 'app' );
App.init();
