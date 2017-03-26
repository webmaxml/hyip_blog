<?php 

class Categories_Controller extends View_Controller {

	public function __construct() {}

	public function set_vars() {
		parent::set_vars();

		$this->categories_list = $this->get_categories();
	}

	public function get_categories() {
		$cats = get_categories( array(  
		    'order' => 'DESC' 
		) );

		ob_start();
		foreach ( $cats as $cat ) {
	        $url = get_category_link( $cat->cat_ID );
	        require 'categoriesItem.php';
	    }
	    $html = ob_get_contents();
		ob_end_clean();

		return $html;
	}

	public function get_component() {
		$this->set_vars();
		require 'categories.php';
	}
}

?>