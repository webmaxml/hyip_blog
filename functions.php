<?php

// models
require 'models/User.php';
require 'models/UserStats.php';
require 'models/Page.php';
require 'models/ThemeSetup.php';
require 'models/MetaBoxes.php';
require 'models/Filters.php';
require 'models/Widgets.php';
require 'models/View.php';
require 'models/ArticleIndex.php';
require 'models/Article.php';
require 'models/Terms.php';
require 'models/Comments.php';
require 'models/CommentItem.php';
require 'models/ArticleTabs.php';
require 'models/Plan.php';
require 'models/SubscribeMail.php';
// controllers
require 'controllers/RouterController.php';
require 'controllers/AjaxLoginController.php';
require 'controllers/AjaxRegistrationController.php';
require 'controllers/AjaxPostLoaderController.php';
require 'controllers/AjaxHyipPlanController.php';
require 'controllers/AjaxArticleSubscribeController.php';
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

// for some reason registering widget in Widget class
// makes widgets dissapear after admin page reload and not save data

function register_widgets() {
	register_widget( 'Hyip_Logo_Widget' );
}
add_action( 'widgets_init', 'register_widgets' );

?>