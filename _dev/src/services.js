import Bottle from 'bottlejs';

/************************ Models **************************/

import Mediator from './models/Mediator';
import ViewMapper from './models/ViewMapper';
import ModelMapper from './models/ModelMapper';
import User from './models/User';
import Page from './models/Page';
import PlansList from './models/PlansList';
import ProfitCalcPlanSelect from './models/ProfitCalcPlanSelect';
import ProfitCalcDeposit from './models/ProfitCalcDeposit';
import ProfitCalcRefback from './models/ProfitCalcRefback';
import ProfitCalcChart from './models/ProfitCalcChart';

/************************ Controllers **************************/

import RouterController from './controllers/RouterController';
import ProfitCalcPlanSelectController from './controllers/ProfitCalcPlanSelectController';
import ProfitCalcDepositController from './controllers/ProfitCalcDepositController';
import ProfitCalcRefbackController from './controllers/ProfitCalcRefbackController';
import ProfitCalcChartController from './controllers/ProfitCalcChartController';
import CommentsController from './controllers/CommentsController';

/************************ Views **************************/

import ProfitCalcPlanSelectView from './views/ProfitCalcPlanSelectView';
import ProfitCalcDepositView from './views/ProfitCalcDepositView';
import ProfitCalcRefbackView from './views/ProfitCalcRefbackView';
import ProfitCalcChartView from './views/ProfitCalcChartView';
import ProfitCalcFormView from './views/ProfitCalcFormView';

/************************ Factories **************************/

import CommentsRespondFactory from './factories/CommentsRespondFactory';

/************************ Components **************************/

import Slider from './components/slider/SliderController';
import PostTabs from './components/postTabs/PostTabsController';
import Tooltip from './components/tooltip/TooltipController';
import UpButton from './components/upButton/UpButtonController';
import UserPanel from './components/userPanel/UserPanelController';
import UserTabs from './components/userTabs/UserTabsController';
import RegistrationForm from './components/registrationForm/RegistrationFormController';
import LoginForm from './components/loginForm/LoginFormController';
import PostLoader from './components/postLoader/PostLoaderController';
import Modals from './components/modals/ModalsController';
import ModalsSelect from './components/modals/ModalsSelectController';



let bottle = new Bottle();



/************************ Models **************************/

bottle.service( 'mediator', Mediator );
bottle.service( 'viewMapper', ViewMapper, 
							  'user',
							  'slider', 
							  'postTabs', 
							  'tooltip',
							  'upButton',
							  'commentsController',
							  'profitCalcPlanSelectController',
							  'profitCalcDepositController',
							  'profitCalcRefbackController',
							  'profitCalcChartController',
							  'modals',
							  'userPanel',
							  'userTabs',
							  'registrationForm',
							  'loginForm',
							  'postLoader' );
bottle.service( 'modelMapper', ModelMapper,
							   'plansList',
							   'profitCalcChart' );
bottle.service( 'user', User );
bottle.service( 'page', Page );
bottle.service( 'plansList', PlansList );
bottle.service( 'profitCalcPlanSelect', ProfitCalcPlanSelect );
bottle.factory( 'profitCalcDeposit', container => {
	return new ProfitCalcDeposit({ 
		_plansListInstance: container.plansList 
	});
} );
bottle.factory( 'profitCalcRefback', container => {
	return new ProfitCalcRefback({ 
		_plansListInstance: container.plansList 
	});
} );
bottle.factory( 'profitCalcChart', container => {
	return new ProfitCalcChart({ 
		_plansListInstance: container.plansList,
		_depositInstance: container.profitCalcDeposit,
		_refbackInstance: container.profitCalcRefback 
	});
} );

/************************ Controllers **************************/

bottle.service( 'routerController', RouterController, 'viewMapper', 'modelMapper', 'mediator' );
bottle.service( 'profitCalcPlanSelectController', ProfitCalcPlanSelectController, 
												  'plansList', 
												  'profitCalcPlanSelect', 
												  'profitCalcPlanSelectView' );
bottle.service( 'profitCalcDepositController', ProfitCalcDepositController,
											  'profitCalcDeposit', 
											  'profitCalcDepositView' );
bottle.service( 'profitCalcRefbackController', ProfitCalcRefbackController,
											    'profitCalcRefback', 
											    'profitCalcRefbackView' );
bottle.service( 'profitCalcChartController', ProfitCalcChartController,
											    'profitCalcChart', 
											    'profitCalcChartView',
											    'profitCalcFormView' );
bottle.service( 'commentsController', CommentsController, 'commentsRespondFactory' );

/************************ Views **************************/

bottle.service( 'profitCalcPlanSelectView', ProfitCalcPlanSelectView );
bottle.service( 'profitCalcDepositView', ProfitCalcDepositView );
bottle.service( 'profitCalcRefbackView', ProfitCalcRefbackView );
bottle.service( 'profitCalcChartView', ProfitCalcChartView );
bottle.service( 'profitCalcFormView', ProfitCalcFormView );

/************************ Factories **************************/

bottle.service( 'commentsRespondFactory', CommentsRespondFactory );

/************************ Components **************************/

bottle.service( 'tooltip', Tooltip );
bottle.service( 'slider', Slider );
bottle.service( 'postTabs', PostTabs );
bottle.service( 'upButton', UpButton );
bottle.service( 'userPanel', UserPanel );
bottle.service( 'userTabs', UserTabs );
bottle.service( 'registrationForm', RegistrationForm );
bottle.service( 'loginForm', LoginForm );
bottle.service( 'postLoader', PostLoader, 'mediator' );
bottle.service( 'modals', Modals, 'modalsSelect' );
bottle.service( 'modalsSelect', ModalsSelect );


export default bottle;