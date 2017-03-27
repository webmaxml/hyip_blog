import Bottle from 'bottlejs';

/************************ Controllers **************************/

import RouterController from './controllers/RouterController';
import ViewController from './controllers/ViewController';

/************************ Classes **************************/

import Mediator from './classes/Mediator';
import User from './classes/User';

/************************ Components **************************/

import Slider from './components/slider/SliderController';
import PostTabs from './components/postTabs/PostTabsController';
import Tooltip from './components/tooltip/TooltipController';
import UpButton from './components/upButton/UpButtonController';
import Comments from './components/comments/CommentsController';
import UserPanel from './components/userPanel/UserPanelController';
import UserTabs from './components/userTabs/UserTabsController';
import RegistrationForm from './components/registrationForm/RegistrationFormController';
import LoginForm from './components/loginForm/LoginFormController';
import PostLoader from './components/postLoader/PostLoaderController';
// profit component
import ProfitCalc from './components/profitCalc/Profit';
import ProfitChart from './components/profitCalc/ProfitChartController';
import ProfitForm from './components/profitCalc/ProfitFormController';
import ProfitFormSelect from './components/profitCalc/ProfitFormSelectController';
import ProfitFormInput from './components/profitCalc/ProfitFormInputController';
import ProfitFormCheckbox from './components/profitCalc/ProfitFormCheckboxController';
// modals component
import Modals from './components/modals/ModalsController';
import ModalsSelect from './components/modals/ModalsSelectController';


let bottle = new Bottle();

/************************ Subsystems **************************/

bottle.service( 'routerController', RouterController, 'viewController', 'mediator' );
bottle.service( 'viewController', ViewController, 
				   'user',
				   'slider', 
				   'postTabs', 
				   'tooltip',
				   'upButton',
				   'comments',
				   'profitCalc',
				   'modals',
				   'userPanel',
				   'userTabs',
				   'registrationForm',
				   'loginForm',
				   'postLoader' );

/************************ Classes **************************/

bottle.service( 'mediator', Mediator );
bottle.service( 'user', User );

/************************ UI components **************************/

bottle.service( 'tooltip', Tooltip );
bottle.service( 'slider', Slider );
bottle.service( 'postTabs', PostTabs );
bottle.service( 'comments', Comments );
bottle.service( 'upButton', UpButton );
bottle.service( 'userPanel', UserPanel );
bottle.service( 'userTabs', UserTabs );
bottle.service( 'registrationForm', RegistrationForm );
bottle.service( 'loginForm', LoginForm );
bottle.service( 'postLoader', PostLoader, 'mediator' );
// profit component
bottle.service( 'profitCalc', ProfitCalc, 'mediator', 'profitChart', 'profitForm' );
bottle.service( 'profitForm', ProfitForm, 
					'mediator', 
					'profitFormSelect', 
					'profitFormInput', 
					'profitFormCheckbox' );
bottle.service( 'profitFormSelect', ProfitFormSelect, 'mediator' );
bottle.service( 'profitFormInput', ProfitFormInput );
bottle.service( 'profitFormCheckbox', ProfitFormCheckbox );
bottle.service( 'profitChart', ProfitChart, 'mediator' );
// modals component
bottle.service( 'modals', Modals, 'modalsSelect' );
bottle.service( 'modalsSelect', ModalsSelect );


export default bottle;