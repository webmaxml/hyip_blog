<?php 

class Ajax_Article_Subscribe_Controller {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->page = Page::get_instance();
		$this->subscribe = Hyip_Subscribe_Mail::get_instance();
	}	

	public function init() {
		add_action( 'wp_ajax_article_subscribe', array( $this, 'create_subscriber' ) );
		add_action( 'wp_ajax_nopriv_article_subscribe', array( $this, 'create_subscriber' ) );
	}

	public function create_subscriber() {
		$name = isset( $_POST[ 'name' ] ) ? sanitize_user( $_POST[ 'name' ] ) : '';
		$email = isset( $_POST[ 'email' ] ) ? sanitize_email( $_POST[ 'email' ] ) : '';

		if ( !is_email( $email ) ) {
			wp_send_json_error( 'Мы не работаем с подобными почтовыми адресами. Пожалуйста, выберите другой адрес' );
		}

		if ( $this->subscribe->subscriber_exist( $email ) ) {
			wp_send_json_error( 'Подписчик с такой почтой уже существует.' );
		}

		$result = $this->subscribe->create_subscriber( $name, $email );

		if ( is_wp_error( $result ) ) {
			wp_send_json_error( $result->get_error_message() );
		}

		wp_send_json_success( 'Спасибо, ' . $name . ', за подписку!' );
	}

}

?>