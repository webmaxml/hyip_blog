// deps
import Bottle from 'bottlejs';
// services
import RouterController from './ui/RouterController';
import UIController from './ui/UIController';
import DomainController from './domain/DomainController';
import DomainFacade from './domain/DomainFacade';
// ui components
import Slider from './ui/components/slider/SliderController';
import Tabs from './ui/components/tabs/TabsController';
import Tooltip from './ui/components/tooltip/TooltipController';
import UpButton from './ui/components/upButton/UpButtonController';
import Comments from './ui/components/comments/CommentsController';

import Profit from './ui/components/hyipItem/ProfitController';
import ProfitChart from './ui/components/hyipItem/ProfitChartController';
import ProfitForm from './ui/components/hyipItem/ProfitFormController';
import ProfitFormSelect from './ui/components/hyipItem/ProfitFormSelectController';
import ProfitFormInput from './ui/components/hyipItem/ProfitFormInputController';
// domain components
import PlansList from './domain/components/PlansList';

let bottle = new Bottle();

bottle.service( 'router', RouterController, 'uiController' );

bottle.service( 'domainFacade', DomainFacade, 'domainController' );

bottle.service( 'domainController', DomainController, 'plansList' );
bottle.service( 'uiController', UIController, 
				   'slider', 
				   'tabs', 
				   'tooltip',
				   'upButton',
				   'comments',
				   'profit' );

bottle.service( 'profit', Profit, 'domainFacade', 'profitChart', 'profitForm' );
bottle.service( 'profitForm', ProfitForm, 'profitFormSelect', 'profitFormInput' );
bottle.service( 'profitFormSelect', ProfitFormSelect );
bottle.service( 'profitFormInput', ProfitFormInput );
bottle.service( 'profitChart', ProfitChart );

bottle.service( 'tooltip', Tooltip );
bottle.service( 'slider', Slider );
bottle.service( 'tabs', Tabs );
bottle.service( 'comments', Comments );
bottle.service( 'upButton', UpButton );

bottle.service( 'plansList', PlansList );

export default bottle;