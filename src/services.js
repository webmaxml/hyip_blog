// deps
import { ServiceContainer, ServiceLocator } from './classes/ServiceContainer';
// services
import { App } from './classes/App';
import { DomainFacade } from './domain/classes/DomainFacade';
import { UIFacade } from './ui/classes/UIFacade';

// instantiate container
let container = new ServiceContainer();
let locator = new ServiceLocator( container );
container.setLocator( locator );

// registering services
container.add( 'app', App );
container.add( 'domainFacade', DomainFacade );
container.add( 'uiFacade', UIFacade );

export default container;