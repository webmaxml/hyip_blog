<?php

class View_Controller {

	public function __construct() {
		$this->head = new Head_Controller;
		$this->top_banner = new Top_Banner_Controller;
		$this->header = new Header_Controller;
		$this->main_menu = new Main_Menu_Controller;
		$this->post_index = new Post_Index_Controller;
		$this->categories = new Categories_Controller;
		$this->post_tabs = new Post_Tabs_Controller;
		$this->subscribe = new Subscribe_Controller;
		$this->modals = new Modals_Controller;
	}

	public function set_vars() {
		$this->ajax_loader_src = get_template_directory_uri() . '/assets/img/loader.gif';
		$this->pages_id = array(
			'cabinet' => 8,
			'article_index' => 33,
			'hyip_index' => 36
		);
	}

	public function get( $name ) {
		switch ( $name ) {
			case 'head':         $this->head->get_component(); break;
			case 'topBanner':    $this->top_banner->get_component(); break;
			case 'header':       $this->header->get_component(); break;
			case 'mainMenu':     $this->main_menu->get_component(); break;
			case 'postIndex':    $this->post_index->get_component(); break;
			case 'categories':   $this->categories->get_component(); break;
			case 'postTabs':     $this->post_tabs->get_component(); break;
			case 'subscribe':    $this->subscribe->get_component(); break;
			case 'modals':       $this->modals->get_component(); break;
		}
	}

}

?>