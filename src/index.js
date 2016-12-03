// deps
import 'babel-polyfill';
import container from './services';

// init app
let app = container.get( 'app' );
app.init();



