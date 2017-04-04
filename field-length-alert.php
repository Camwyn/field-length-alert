<?php
/**
 * Plugin Name: Field Length Alert
 * Description: Alert the user when a post editor field length exceeds some limit
 * Author:      Stephen Page, 10up
 * Author URI:  http://10up.com/
 */

 /**
  * Add client-side title counter functionality.
  */
 class fieldLengthAlert {
	public $version = '1.0';

	private $config = NULL;

	/**
	 * Initialize the plugin and register all the hooks.
	 */
	public function __construct() {
		// Register hooks. this is only used in admin dashboard
		if ( ! is_admin() ) {
			return;
		}

		add_action( 'admin_enqueue_scripts', array( $this, 'admin_enqueue_scripts' ) );
	}//END __construct

	/**
	 * Implements the admin_enqueue_scripts action in to add CSS and JS.
	 */
	public function admin_enqueue_scripts( $hook_suffix ) {
		// Would love to use current_screen here, but it fails too often
		if ( 'post.php' != $hook_suffix && 'post-new.php' != $hook_suffix ) {
			return; // We're not on post edit admin page, bail.
		}

		$min = ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? 'compiled' : 'min';

		wp_register_style(
			'field-length-alert',
			plugins_url( 'assets/css/' . $min . '/field-length-alert.css', __FILE__ ),
			FALSE,
			$this->version
		);
		wp_enqueue_style( 'field-length-alert' );

		wp_register_script(
			'field-length-alert',
			plugins_url( 'assets/js/' . $min . '/field-length-alert.js', __FILE__ ),
			array( 'jquery' ),
			$this->version,
			TRUE
		);
		wp_enqueue_script( 'field-length-alert' );
	}
 }


new fieldLengthAlert();
