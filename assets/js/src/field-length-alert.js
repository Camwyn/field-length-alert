/********************************
	Name: WordPress Field Length Alert
	Usage:

	Basic:
	window.Camwyn.fieldLengthAlert( '#title' );

	Allthethings:
	window.Camwyn.fieldLengthAlert( {
		target: ['#title', '.newtag']
		error_threshold: 55,
		warn_threshold: 45
	}, function() {
		console.log( 'Amazing callback function!' );
	} );
********************************/

( function() {
	'use strict';

	// Define global Camwyn object if it doesn't exist
	if ( 'object' !== typeof window.Camwyn ) {
		window.Camwyn = {};
	}

	// This is our global alert index to keep unique ids
	var alertIndex = 0,
	// declare once - we'll use it later.
		alertTarget = [],
		// Simple iterator for reuse
		forEach = function( array, callback, scope ) {
			for ( var i = 0, imax = array.length; i < imax; i++ ) {
				callback.call( scope, i, array[i] ); // passes back stuff we need
			}
		},
		acceptedTypes = [
			'text',
			'textarea'
		];

	// Rules out non-inputs and ones that don't make sense to limit.
	function isLimitable( input ) {
		if ( input.tagName === 'INPUT' ) {
			if ( acceptedTypes.indexOf( input.type ) > -1 ) {
				return true;
			}
		}

		return false;
	}

	window.Camwyn.fieldLengthAlert = function( options, callback ) {
		if ( 'undefined' === typeof options ) {
			// Bail if we don't have any options
			return;
		} else if ( 'string' === typeof options ) {
			// Allow passing of only a target as string
			var target = options;
			options = { 'target': target};
		} else if ( 'undefined' === typeof options.target ) {
			// Bail if we have options but don't have a target defined
			return;
		}

		if ( 'string' === typeof options.target ) {
			alertTarget = document.querySelectorAll( options.target );
		} else if ( Array.isArray( options.target ) ) {
			forEach( options.target, function( index, value ) {
				var targets = document.querySelectorAll( value );
				Array.prototype.push.apply( alertTarget, targets );
			} );
		}

		if ( ! alertTarget ) {
			return;
		}

		alertIndex++;

		function update_title_count( field, spanWrap, options ) {
			// set some defaults
			var warnThreshold  = options.warn_threshold || 55,
				errorThreshold = options.error_threshold || 65,
				direction      = options.direction || 'down',
				fieldLength    = isNaN( parseInt( field.value.length ) ) ? 0 : parseInt( field.value.length ),
				alertEl        = spanWrap.querySelector( '.field-length-alert' ),
				countEl        = spanWrap.querySelector( '.field-length-alert-count' );

			// handle count direction
			if ( direction !== 'up' ) {
				fieldLength = errorThreshold - fieldLength;
			}

			countEl.textContent = fieldLength.toString();

			// reset classes before changing
			alertEl.classList.remove( '-warn' );
			alertEl.classList.remove( '-error' );

			// conditionally highlight the length count
			if ( direction !== 'up' ) {
				if ( fieldLength <= 0 ) {
					alertEl.classList.remove( '-warn' );
					alertEl.classList.add( '-error' );
				} else if ( fieldLength <= ( errorThreshold - warnThreshold ) ) {
					alertEl.classList.add( '-warn' );
					alertEl.classList.remove( '-error' );
				}
			} else {
				if ( fieldLength >= errorThreshold ) {
					alertEl.classList.remove( '-warn' );
					alertEl.classList.add( '-error' );
				} else if ( fieldLength >= warnThreshold ) {
					alertEl.classList.add( '-warn' );
					alertEl.classList.remove( '-error' );
				}
			}
		}

		forEach( alertTarget, function( index, value ) {
			var field        = value,
				spanWrap     = document.createElement( 'span' ),
				alertNode    = document.createElement( 'span' ),
				countNode    = document.createElement( 'span' );

				// Make sure it makes sense to limit this element
			if ( ! isLimitable( field ) ) {
				return;
			}

			alertNode.classList.add( 'field-length-alert' );
			countNode.classList.add( 'field-length-alert-count' );
			alertNode.appendChild( countNode );

			index++;

			// Wrap in a span, as we need something to add the counter to
			spanWrap.setAttribute( 'id', 'wrap' + alertIndex + '-' + index );
			spanWrap.classList.add( 'alert-wrap' );

			// Make the span the same width and font size as the input
			var cs = window.getComputedStyle( field, null );
			spanWrap.style.maxWidth = cs.getPropertyValue( 'width' );
			alertNode.style.fontSize = cs.fontSize;

			// insert the span - just before the field
			field.parentNode.insertBefore( spanWrap, field );

			// move the input into the span
			spanWrap.appendChild( field );

			// append the alert block
			spanWrap.appendChild( alertNode );

			// this is unlikely, but since we set a max-width..
			window.onresize = function() {
				// reset width so responsive fields (like title) stay responsive
				spanWrap.style.maxWidth = '100%';
				spanWrap.style.maxWidth = cs.getPropertyValue( 'width' );
			};

			// add event listener on focus (this will add it back when removed on blur, below)
			field.addEventListener( 'focus', function() {
				field.addEventListener( 'keyup', function() {
					update_title_count( field, spanWrap, options );
				}, true );
			}, true );

			// remove listener on blur (garbage collection)
			field.addEventListener( 'blur', function() {
				field.removeEventListener( 'keyup', update_title_count );
			}, true );

			// update the number once.
			update_title_count( field, spanWrap, options );

		} );

		// Execute the callback function
		if ( typeof callback === 'function' ) {
			callback.call();
		}
	};

	/* @NOTE: These examples here for testing
	document.addEventListener( 'DOMContentLoaded', function() {
		// Basic - ID
		window.Camwyn.fieldLengthAlert( '#title' );

		// Less Basic - by type (this is crazy, don't do this in production!)
		window.Camwyn.fieldLengthAlert( 'input[type=text]' );

		// Passing an array of selectors
		window.Camwyn.fieldLengthAlert( {
			target: ['#title', '.newtag'], // array of fields
			error_threshold: 55,
			warn_threshold: 45
		} );

		// Allthethings
		window.Camwyn.fieldLengthAlert( {
			target: ['#title', '.newtag']
			error_threshold: 55,
			warn_threshold: 45
		}, function() {
			console.log( 'Amazing callback function!' );
		} );
	} );
	*/

} )();
