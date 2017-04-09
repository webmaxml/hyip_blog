<?php

class View_Controller {

	public function __construct() {}

	protected function set_vars() {
		$this->ajax_loader_src = get_template_directory_uri() . '/assets/img/loader.gif';
		$this->pages_id = array(
			'cabinet' => 8,
			'article_index' => 33,
			'hyip_index' => 36
		);
	}

}

?>