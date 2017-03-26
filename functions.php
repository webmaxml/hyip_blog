<?php

// controllers
require 'controllers/MainController.php';
require 'controllers/ThemeController.php';
require 'controllers/FilterController.php';
require 'controllers/WidgetController.php';
require 'controllers/AjaxLoginController.php';
require 'controllers/AjaxRegistrationController.php';
require 'controllers/ViewController.php';
// classes
require 'classes/User.php';
// widgets
require 'widgets/Logo.php';
// components
require '/components/head/HeadController.php';
require '/components/topBanner/TopBannerController.php';
require '/components/header/HeaderController.php';
require '/components/mainMenu/MainMenuController.php';
require '/components/postIndex/PostIndexController.php';
require '/components/categories/CategoriesController.php';
require '/components/postTabs/PostTabsController.php';
require '/components/subscribe/SubscribeController.php';
require '/components/modals/ModalsController.php';

$controller = new Main_Controller;
$view = $controller->get_view_controller();

function get_comments_string( $comments_num ) {
	switch ( $comments_num ) {
		case 0:
			return '0 комментариев';
		case 1:
			return '1 комментарий';
		default:
			return $comments_num . ' комментариев';
	}
}

?>