import Bottle from 'bottlejs';

/************************ Models **************************/

import GlobalData from './models/GlobalData';
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
import Comments from './models/Comments';
import Slider from './models/Slider';
import PostTabs from './models/PostTabs';
import Modals from './models/Modals';
import Window from './models/Window';
import UpButton from './models/UpButton';
import RefbackModalSelect from './models/RefbackModalSelect';
import UserPopup from './models/UserPopup';
import PostLoader from './models/PostLoader';

/************************ Controllers **************************/

import RouterController from './controllers/RouterController';
import ProfitCalcPlanSelectController from './controllers/ProfitCalcPlanSelectController';
import ProfitCalcDepositController from './controllers/ProfitCalcDepositController';
import ProfitCalcRefbackController from './controllers/ProfitCalcRefbackController';
import ProfitCalcChartController from './controllers/ProfitCalcChartController';
import CommentsController from './controllers/CommentsController';
import SliderController from './controllers/SliderController';
import PostTabsController from './controllers/PostTabsController';
import TooltipController from './controllers/TooltipController';
import ModalsController from './controllers/ModalsController';
import WindowController from './controllers/WindowController';
import UpButtonController from './controllers/UpButtonController';
import RefbackModalSelectController from './controllers/RefbackModalSelectController';
import UserPopupController from './controllers/UserPopupController';
import LoginFormController from './controllers/LoginFormController';
import RegistrationFormController from './controllers/RegistrationFormController';
import PostLoaderController from './controllers/PostLoaderController';

/************************ Views **************************/

import ProfitCalcPlanSelectView from './views/ProfitCalcPlanSelectView';
import ProfitCalcDepositView from './views/ProfitCalcDepositView';
import ProfitCalcRefbackView from './views/ProfitCalcRefbackView';
import ProfitCalcChartView from './views/ProfitCalcChartView';
import ProfitCalcFormView from './views/ProfitCalcFormView';
import SliderView from './views/SliderView';
import WindowView from './views/WindowView';
import UpButtonView from './views/UpButtonView';
import RefbackModalSelectView from './views/RefbackModalSelectView';
import UserPopupView from './views/UserPopupView';
import LoginFormView from './views/LoginFormView';
import RegistrationFormView from './views/RegistrationFormView';
import PostLoaderButtonView from './views/PostLoaderButtonView';
import PostContainerView from './views/PostContainerView';

/************************ Factories **************************/

import CommentsRespondFactory from './factories/CommentsRespondFactory';
import SliderItemFactory from './factories/SliderItemFactory';
import PostTabsFactory from './factories/PostTabsFactory';
import TooltipFactory from './factories/TooltipFactory';
import ModalsFactory from './factories/ModalsFactory';

/************************ Components **************************/

import UserTabs from './components/userTabs/UserTabsController';



let bottle = new Bottle();



/************************ Models **************************/

bottle.service( 'globalData', GlobalData );
bottle.service( 'mediator', Mediator );
bottle.service( 'viewMapper', ViewMapper, 
							  'user',
							  'sliderController', 
							  'postTabsController', 
							  'tooltipController',
							  'windowController',
							  'upButtonController',
							  'commentsController',
							  'profitCalcPlanSelectController',
							  'profitCalcDepositController',
							  'profitCalcRefbackController',
							  'profitCalcChartController',
							  'modalsController',
							  'refbackModalSelectController',
							  'userPopupController',
							  'userTabs',
							  'registrationFormController',
							  'loginFormController',
							  'postLoaderController' );
bottle.service( 'modelMapper', ModelMapper,
							   'plansList',
							   'profitCalcChart',
							   'postTabs',
							   'window',
							   'postLoader' );
bottle.factory( 'user', container => {
	return new User({
		_globalData: container.globalData
	});
});
bottle.factory( 'page', container => {
	return new Page({
		_mediator: container.mediator
	});
} );
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
bottle.service( 'comments', Comments );
bottle.service( 'slider', Slider );
bottle.service( 'postTabs', PostTabs );
bottle.service( 'modals', Modals );
bottle.service( 'window', Window );
bottle.factory( 'upButton', container => {
	return new UpButton({
		_windowModelInstance: container.window
	});
} );
bottle.service( 'refbackModalSelect', RefbackModalSelect );
bottle.service( 'userPopup', UserPopup );
bottle.factory( 'postLoader', container => {
	return new PostLoader({
		_globalData: container.globalData,
		_page: container.page
	})
} );

/************************ Controllers **************************/

bottle.factory( 'routerController', container => {
	return new RouterController({
		_viewMapper: container.viewMapper,
		_modelMapper: container.modelMapper,
		_mediator: container.mediator,
		_page: container.page
	})
});
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
bottle.service( 'commentsController', CommentsController, 'comments', 'commentsRespondFactory' );
bottle.service( 'sliderController', SliderController, 'slider', 'sliderItemFactory', 'sliderView' );
bottle.service( 'postTabsController', PostTabsController, 'postTabs', 'postTabsFactory' );
bottle.service( 'tooltipController', TooltipController, 'tooltipFactory' );
bottle.service( 'modalsController', ModalsController, 'modals', 'modalsFactory' );
bottle.service( 'windowController', WindowController, 'window', 'windowView' );
bottle.service( 'upButtonController', UpButtonController, 'upButton', 'upButtonView' );
bottle.service( 'refbackModalSelectController', RefbackModalSelectController, 
												'refbackModalSelect', 
												'refbackModalSelectView' );
bottle.service( 'userPopupController', UserPopupController, 'userPopup', 'userPopupView' );
bottle.service( 'loginFormController', LoginFormController, 'user', 'loginFormView' );
bottle.service( 'registrationFormController', RegistrationFormController, 'user', 'registrationFormView' );
bottle.service( 'postLoaderController', PostLoaderController, 
										'postLoader',
										'postLoaderButtonView',
										'postContainerView' );

/************************ Views **************************/

bottle.service( 'profitCalcPlanSelectView', ProfitCalcPlanSelectView );
bottle.service( 'profitCalcDepositView', ProfitCalcDepositView );
bottle.service( 'profitCalcRefbackView', ProfitCalcRefbackView );
bottle.service( 'profitCalcChartView', ProfitCalcChartView );
bottle.service( 'profitCalcFormView', ProfitCalcFormView );
bottle.service( 'sliderView', SliderView );
bottle.service( 'windowView', WindowView );
bottle.service( 'upButtonView', UpButtonView );
bottle.service( 'refbackModalSelectView', RefbackModalSelectView );
bottle.service( 'userPopupView', UserPopupView );
bottle.service( 'loginFormView', LoginFormView );
bottle.service( 'registrationFormView', RegistrationFormView );
bottle.service( 'postLoaderButtonView', PostLoaderButtonView );
bottle.service( 'postContainerView', PostContainerView );

/************************ Factories **************************/

bottle.service( 'commentsRespondFactory', CommentsRespondFactory );
bottle.service( 'sliderItemFactory', SliderItemFactory );
bottle.service( 'postTabsFactory', PostTabsFactory );
bottle.service( 'tooltipFactory', TooltipFactory );
bottle.service( 'modalsFactory', ModalsFactory );

/************************ Components **************************/

bottle.service( 'userTabs', UserTabs );


export default bottle;