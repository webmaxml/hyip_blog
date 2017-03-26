<?php 

class Modals_Controller extends View_Controller {

	public function __construct() {}

	public function set_vars() {
		parent::set_vars();

		$this->registration_nonce_action = 'hyip_registration';
		$this->login_nonce_action = 'hyip_logining';
	}

	public function get_component() {
		$this->set_vars();
		require 'modals.php';
	}

}

?>