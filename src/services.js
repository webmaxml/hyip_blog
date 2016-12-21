// deps
import { ServiceContainer, ServiceLocator } from './classes/ServiceContainer';
// services
import { App } from './classes/App';
import View from './components/ViewInterface';
// view components
import UpButtonInterface from './components/upButton/UpButtonInterface';
import TabsInterface from './components/tabs/TabsInterface';
import SliderInterface from './components/slider/SliderInterface';


// instantiate container
let container = new ServiceContainer();
let locator = new ServiceLocator( container );
container.setLocator( locator );

// services
container.add( 'app', App );
container.add( 'view', View );

// view components
container.add( 'upButton', UpButtonInterface );
container.add( 'tabs', TabsInterface );
container.add( 'slider', SliderInterface );


export default container;