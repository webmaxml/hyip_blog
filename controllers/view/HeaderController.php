<?php 

class Header_Controller extends View_Controller {

	public function __construct() {}

	public function set_vars() {
		parent::set_vars();

		$this->user = wp_get_current_user();
		$this->user_avatar = get_avatar( $this->user->ID, 22 );
		$this->user_cabinet_url = get_page_link( $this->pages_id[ 'cabinet' ] );
	}

	public function get_view() {
		$this->set_vars();
		require '/../../views/header.php';
	}

}

?>