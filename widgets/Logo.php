<?php 

class Hyip_Logo_Widget extends WP_Widget {

	public function __construct() {
		parent::__construct( 'hyip_logo', 'Текст логотипа', array( 
			'description' => 'Отображает логотип, состоящий из 2-ух цветовых частей' 
		) );
	}

	public function form( $instance ) {
		$first_part = '';
		$second_part = '';

		if ( !empty( $instance ) ) {
			$first_part = $instance[ 'first_part' ];
			$second_part = $instance[ 'second_part' ];
		}

		$first_part_id = $this->get_field_id( 'first_part' );
		$first_part_name = $this->get_field_name( 'first_part' );

		$second_part_id = $this->get_field_id( 'second_part' );
		$second_part_name = $this->get_field_name( 'second_part' );
		?>

		<label for="<?php echo $first_part_id; ?>">Первая часть логотипа</label>
		<input type="text" 
			   id="<?php echo $first_part_id; ?>" 
			   name="<?php echo $first_part_name; ?>" 
			   value="<?php echo $first_part; ?>">
		
		<br>

		<label for="<?php echo $second_part_id; ?>">Вторая часть логотипа</label>
		<input type="text" 
			   id="<?php echo $second_part_id; ?>" 
			   name="<?php echo $second_part_name; ?>" 
			   value="<?php echo $second_part; ?>">

		<?php
	}

	public function update( $newInstance, $oldInstance ) {
		$values = array();
		$values["first_part"] = htmlentities( $newInstance[ "first_part"] );
		$values["second_part"] = htmlentities( $newInstance["second_part"] );
		return $values;
	}

	public function widget( $args, $instance ) {
		?>

		<a class="header__logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<b class="header__logo-accent"><?php echo $instance[ 'first_part' ]; ?></b><?php echo $instance[ 'second_part' ]; ?>
		</a>

		<?php
	}

}

?>