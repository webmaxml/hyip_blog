<?php

class Main_Controller {

	private $theme_controller;
	private $filter_controller;
	private $widget_controller;
	private $ajax_login_controller;
	private $ajax_registration_controller;
	private $view_controller;

	public function __construct() {
		$this->theme_controller = new Theme_Controller;
		$this->filter_controller = new Filter_Controller;
		$this->widget_controller = new Widget_Controller;
		$this->ajax_login_controller = new Ajax_Login_Controller;
		$this->ajax_registration_controller = new Ajax_Registration_Controller;
		$this->view_controller = new View_Controller;
	}

	public function get_view_controller() {
		return $this->view_controller;
	}

}

?>