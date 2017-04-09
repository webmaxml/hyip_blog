<?php

class View {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->head = new Head_Controller;
		$this->top_banner = new Top_Banner_Controller;
		$this->header = new Header_Controller;
		$this->main_menu = new Main_Menu_Controller;
		$this->article_index = new Article_Index_Controller;
		$this->categories = new Categories_Controller;
		$this->post_tabs = new Post_Tabs_Controller;
		$this->subscribe = new Subscribe_Controller;
		$this->modals = new Modals_Controller;
		$this->article = new Article_Controller;
	}

	public function get( $name ) {
		switch ( $name ) {
			case 'head':         		$this->head->get_view(); break;
			case 'topBanner':    		$this->top_banner->get_view(); break;
			case 'header':       		$this->header->get_view(); break;
			case 'mainMenu':     		$this->main_menu->get_view(); break;
			case 'articleIndex': 		$this->article_index->get_view(); break;
			case 'categories':   		$this->categories->get_view(); break;
			case 'postTabs':     		$this->post_tabs->get_view(); break;
			case 'subscribe':    		$this->subscribe->get_view(); break;
			case 'modals':       		$this->modals->get_view(); break;
			case 'article':       		$this->article->get_view(); break;
			default:			 		echo '<p style="color:red;">There is no such view "' . $name . '"!</p>';
		}
	}

}

?>