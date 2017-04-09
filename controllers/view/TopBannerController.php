<?php 

class Top_Banner_Controller extends View_Controller {

	public function __construct() {}

	public function set_vars() {
		parent::set_vars();

		$top_banner_id = 6;

		$this->top_banner_url = get_field( 'url', $top_banner_id );
		$this->top_banner_thumbnail_url = get_the_post_thumbnail_url( $top_banner_id, 'full' );
	}

	public function get_view() {
		$this->set_vars();
		require '/../../views/topBanner.php';
	}

}

?>