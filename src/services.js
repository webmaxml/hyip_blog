// deps
import { ServiceContainer, ServiceLocator } from './classes/ServiceContainer';
// services
import { App } from './classes/App';

// instantiate container
let container = new ServiceContainer();
let locator = new ServiceLocator( container );
container.setLocator( locator );

// registering services
container.add( 'app', App );

export default container;