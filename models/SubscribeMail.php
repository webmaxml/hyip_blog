<?php  

class Hyip_Subscribe_Mail {

	private static $instance;

	public static function get_instance() {
		if ( !isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	private function __construct() {
		$this->article = Article::get_instance();
	}

	public function init() {
		add_action( 'publish_article', array( $this, 'send_emails' ), 10, 2 );

		add_filter( 'wp_mail_from_name', function( $name ) {
			return get_option( 'blogname' );;
		} );

		add_filter( 'wp_mail_from', function( $email ) {
			return get_option( 'admin_email' );
		} );
	}

	private function get_article_content( $article ) {
		ob_start(); ?>

		<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
		<html>
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
		<title></title>
		</head>

		<table border="0" cellpadding="0" cellspacing="0" style="margin:0;padding:0;">
			<tr>
				<td align="center" valign="middle">
			  		<a href="<?php echo $article[ 'link' ]; ?>" style="display: block; text-decoration: none;" target="_blank">
			  			<span style="color: #2f2f2f; font-size: 22px; font-family: Georgia, serif; line-height: 30px; webkit-text-size-adjust:none; font-weight: bold;">
			  				<?php echo $article[ 'title' ][ 'name' ]; ?>
			 			</span>
			  		</a>
				</td>
			</tr>
			<tr>
				<td align="center" valign="middle" style="padding-top: 40px; padding-bottom: 40px;">
		  			<img src="<?php echo $article[ 'thumbnail_url' ]; ?>" alt="<?php echo $article[ 'title' ][ 'title_attr' ] ?>" border="0" width="240" style="display:block;"/>
				</td>
			</tr>
				<td align="left" valign="middle">
					<span style="color: #2f2f2f; font: 16px Arial, sans-serif; line-height: 22px; -webkit-text-size-adjust:none; display: block;">
						<?php echo $article[ 'excerpt_text' ]; ?>
					</span>
				</td>
			</tr>
			<tr>
				<td align="center" valign="middle" style="padding-top: 40px; padding-bottom: 40px;">
		  			<a href="<?php echo $article[ 'link' ]; ?>" 
		      		   style="background-color: #ff5b24; padding-left: 22px;padding-right: 22px; display: block; width: 100px; margin: 0 auto; text-decoration: none;" target="_blank">
		      			<span style="color: #ffffff; font: 22px Georgia, serif; line-height: 44px; -webkit-text-size-adjust:none;">Читать</span>
		  			</a>
				</td>
			</tr>
		</table>


		<?php $content = ob_get_contents();
		ob_end_clean();

		return $content;
	}

	public function create_subscriber( $name, $email ) {
		$subscriber_id = wp_insert_post( array(
			'post_type' => 'article_subscriber',
			'post_title' => $name,
			'post_status' => 'publish'
		), true );

		if ( is_wp_error( $subscriber_id ) ) {
			return $subscriber;
		}

		update_field( 'field_590744deab6de', $email, $subscriber_id );

		return get_post( $subscriber_id );
	}

	public function subscriber_exist( $email ) {
		$subscribers = get_posts( array(
			'posts_per_page' => -1,
			'post_type' => 'article_subscriber'
		) );

		foreach ( $subscribers as $sub ) {
			if ( get_field( 'email', $sub->ID ) === $email ) {
				return true;
			}
		}

		return false;
	}

	public function send_emails( $id, $wp_article ) {
		$query = new WP_Query( array(
			'post_type' => 'article',
			'p' => $id
		) );

		while ( $query->have_posts() ) {
			$query->the_post(); 
			$article = $this->article->get_post( $query->post );
		}
		wp_reset_postdata();

		$title = $article[ 'title' ][ 'name' ];
		$content = $this->get_article_content( $article );
		$emails = array();

		$subscribers = get_posts( array(
			'posts_per_page' => -1,
			'post_type' => 'article_subscriber'
		) );

		foreach ( $subscribers as $sub ) {
			$emails[] = get_field( 'email', $sub->ID );
		}

		$result = wp_mail( $emails, $title, $content, 'Content-type: text/html; charset=utf-8' );

	    if ( !$result ) {
	    	trigger_error( 'При отправке рассылки произошла ошибка' );
	    } 

	}
	
}

?>