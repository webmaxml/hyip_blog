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
require 'models/ArticleTabs.php';
// controllers
require 'controllers/RouterController.php';
require 'controllers/AjaxLoginController.php';
require 'controllers/AjaxRegistrationController.php';
require 'controllers/AjaxPostLoaderController.php';
require 'controllers/ViewController.php';
require 'controllers/HeadController.php';
require 'controllers/TopBannerController.php';
require 'controllers/HeaderController.php';
require 'controllers/MainMenuController.php';
require 'controllers/ArticleIndexController.php';
require 'controllers/CategoriesController.php';
require 'controllers/PostTabsController.php';
require 'controllers/SubscribeController.php';
require 'controllers/ModalsController.php';
require 'controllers/ArticleController.php';
// widgets
require 'widgets/Logo.php';

$router = new Router_Controller;
$view = View::get_instance();

?>