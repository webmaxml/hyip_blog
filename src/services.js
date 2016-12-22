// deps
import { ServiceContainer, ServiceLocator } from './ServiceContainer';
// services
import AppInterface from './App/AppInterface';
import ViewInterface from './App/modules/View/ViewInterface';
// view components
import UpButtonInterface from './App/modules/View/modules/upButton/UpButtonInterface';
import TabsInterface from './App/modules/View/modules/tabs/TabsInterface';
import SliderInterface from './App/modules/View/modules/slider/SliderInterface';
import CommentsInterface from './App/modules/View/modules/comments/CommentsInterface';


// instantiate container
let container = new ServiceContainer();
let locator = new ServiceLocator( container );
container.setLocator( locator );

// services
container.add( 'app', AppInterface );
container.add( 'view', ViewInterface );

// view components
container.add( 'upButton', UpButtonInterface );
container.add( 'tabs', TabsInterface );
container.add( 'slider', SliderInterface );
container.add( 'comments', CommentsInterface );


export default container;