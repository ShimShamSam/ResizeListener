/**
 * This demo needs to work in IE5+
 * Pardon the bad JS patterns
 */
(function scope() {
	var test_count = 1;

	for(var i = 0; i < test_count; ++i) {
		var element = document.getElementById('test-' + i);

		ResizeListener.add(element, function(data) {
			var text = this.getElementsByTagName('div')[0];

			if(this.id === 'test-0') {
				text.innerHTML = data.width + 'x' + data.height;
			}
		});
	}

	// =============================================================
	// Resize handles
	// =============================================================

	var resize_element = null;
	var last_x         = null;
	var last_y         = null;
	var prevent_select = false;
	var resize_width   = false;
	var resize_height  = false;

	document.onselectstart = function(e) {
		e = e || window.event;

		if(prevent_select) {
			if(e.preventDefault) {
				e.preventDefault();
			}

			return false;
		}
	}

	document.onmousedown = function(e) {
		e = e || window.event;

		last_x        = e.clientX;
		last_y        = e.clientY;
		resize_width  = false;
		resize_height = false;

		var element = e.target || e.srcElement;

		while(element) {
			if(element.className === 'right-handle handle') {
				resize_width = true;

				break;
			}

			if(element.className === 'bottom-handle handle') {
				resize_height = true;

				break;
			}


			element = element.parentNode;
		}

		resize_element = element ? element.parentNode : null;
		prevent_select = resize_element ? true : false;
	};

	document.documentElement.onmousemove = function(e) {
		e = e || window.event;

		if(!resize_element) {
			return;
		}

		if(resize_width) {
			var x          = e.clientX;
			var difference = last_x - x;
			var width      = resize_element.offsetWidth;
			var value      = width - difference;

			value = Math.round(Math.min(Math.max(value, 175), 1000));

			resize_element.style.width = value + 'px';
			last_x = x;
		}

		if(resize_height) {
			var y          = e.clientY;
			var difference = last_y - y;
			var height     = resize_element.offsetHeight;
			var value      = height - difference;

			value = Math.round(Math.min(Math.max(value, 100), 1000));

			resize_element.style.height = value + 'px';
			last_y = y;
		}
	};

	document.documentElement.onmouseup = function(e) {
		resize_element = null;
		prevent_select = false;
	};
}());
