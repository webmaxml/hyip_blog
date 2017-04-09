<?php

// models
require 'models/User.php';
require 'models/Page.php';
require 'models/ThemeSetup.php';
require 'models/Filters.php';
require 'models/Widgets.php';
require 'models/View.php';
require 'models/ArticleIndex.php';
require 'models/Article.php';
require 'models/Terms.php';
require 'models/Comments.php';
// controllers
require 'controllers/RouterController.php';

require 'controllers/ajax/AjaxLoginController.php';
require 'controllers/ajax/AjaxRegistrationController.php';
require 'controllers/ajax/AjaxPostLoaderController.php';

require 'controllers/view/ViewController.php';
require 'controllers/view/HeadController.php';
require 'controllers/view/TopBannerController.php';
require 'controllers/view/HeaderController.php';
require 'controllers/view/MainMenuController.php';
require 'controllers/view/ArticleIndexController.php';
require 'controllers/view/CategoriesController.php';
require 'controllers/view/PostTabsController.php';
require 'controllers/view/SubscribeController.php';
require 'controllers/view/ModalsController.php';
require 'controllers/view/ArticleController.php';
// widgets
require 'widgets/Logo.php';

$router = new Router_Controller;
$view = View::get_instance();

?>