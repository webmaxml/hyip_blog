<?php

class Router_Controller {

	public function __construct() {
		$this->page = Page::get_instance();
		$this->user = Hyip_User::get_instance();
		$this->theme_setup = Theme_Setup::get_instance();
		$this->meta_boxes = Meta_Boxes::get_instance();
		$this->filters = Filters::get_instance();
		$this->widgets = Widgets::get_instance();
		$this->article_index = Article_Index::get_instance();
		$this->article_tabs = Article_Tabs::get_instance();

		$this->ajax_post_loader_controller = Ajax_Post_Loader_Controller::get_instance();

		if ( defined( 'DOING_AJAX' ) && DOING_AJAX ) {
			$this->ajax_init();
		} else {
			$this->init();
			add_action( 'wp', array( $this, 'init_with_wp' ) );
		}
	}

	public function init() {
		$this->theme_setup->init();
		$this->meta_boxes->init();
		$this->filters->init();
		$this->widgets->init();
	}

	public function init_with_wp() {
		$this->page->init();
		$this->user->init();
		$this->article_index->init();
		$this->article_tabs->init();
	}

	public function ajax_init() {
		$this->theme_setup->init();
		$this->filters->init();

		$this->page->ajax_init();
		$this->user->init();
		$this->article_index->init();

		$this->ajax_post_loader_controller->init();
	}
}

?>