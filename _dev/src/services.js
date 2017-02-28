import Bottle from 'bottlejs';

/************************ Subsystems **************************/

import Router from './router/Router';
import UIFacade from './ui/UIFacade';
import DomainFacade from './domain/DomainFacade';
import Mediator from './Mediator';

/************************ UI components **************************/

import Slider from './ui/components/slider/SliderController';
import Tabs from './ui/components/tabs/TabsController';
import Tooltip from './ui/components/tooltip/TooltipController';
import UpButton from './ui/components/upButton/UpButtonController';
import Comments from './ui/components/comments/CommentsController';
import UserPanel from './ui/components/header/UserPanelController';
import UserTabs from './ui/components/userCabinet/UserTabsController';
import RegistrationForm from './ui/jsComponents/registrationForm/RegistrationFormController';
// profit component
import Profit from './ui/components/hyipItem/Profit';
import ProfitChart from './ui/components/hyipItem/ProfitChartController';
import ProfitForm from './ui/components/hyipItem/ProfitFormController';
import ProfitFormSelect from './ui/components/hyipItem/ProfitFormSelectController';
import ProfitFormInput from './ui/components/hyipItem/ProfitFormInputController';
import ProfitFormCheckbox from './ui/components/hyipItem/ProfitFormCheckboxController';
// modals component
import Modals from './ui/components/modals/ModalsController';
import ModalsSelect from './ui/components/modals/ModalsSelectController';

/************************ Domain components **************************/

import PlansList from './domain/components/PlansList';
import User from './domain/components/User';


let bottle = new Bottle();

/************************ Subsystems **************************/

bottle.service( 'router', Router, 'uiFacade' );
bottle.service( 'uiFacade', UIFacade, 
				   'slider', 
				   'tabs', 
				   'tooltip',
				   'upButton',
				   'comments',
				   'profit',
				   'modals',
				   'userPanel',
				   'userTabs',
				   'registrationForm' );
bottle.service( 'domainFacade', DomainFacade, 
				   'plansList',
				   'user' );
bottle.service( 'mediator', Mediator );

/************************ UI components **************************/

bottle.service( 'tooltip', Tooltip );
bottle.service( 'slider', Slider );
bottle.service( 'tabs', Tabs );
bottle.service( 'comments', Comments );
bottle.service( 'upButton', UpButton );
bottle.service( 'userPanel', UserPanel, 'domainFacade' );
bottle.service( 'userTabs', UserTabs );
bottle.service( 'registrationForm', RegistrationForm, 'domainFacade' );
// profit component
bottle.service( 'profit', Profit, 'domainFacade', 'mediator', 'profitChart', 'profitForm' );
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

/************************ Domain components **************************/

bottle.service( 'plansList', PlansList, 'mediator' );
bottle.service( 'user', User );

export default bottle;