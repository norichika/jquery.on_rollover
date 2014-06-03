/*
 * jQuery RollOver Plugin v1.0
 * https://github.com/norichika/jquery.on_rollover
 *
 * Copyright 2012, Norichika Yamanaka
 * Dual licensed under the MIT licenses.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function($) {

	var methods = {
		init: function(options) {
			var opts = $.extend({}, $.fn.on_rollover.defaults, options);
			return this.each(function() {
				var $this = $(this);

				//removeName
				var removeName = opts.rollOverObj.substring(1);

				// preload & default RemoveClass Method
				methods.preload.apply($this, arguments);

				// RollOver Method
				$this.on("mouseenter.on_rollover mouseleave.on_rollover", opts.rollOverObj,
				function(event){
					var src = $(this).attr('src');
					if (event.type === 'mouseenter') {
						if(src.indexOf(opts.rollOverImg) < 0) {
							var src_on = src.replace(/^(.+)(\.[a-z]+)$/, "$1" + opts.rollOverImg + "$2");
							$(this).attr('src', src_on);
						}
					} else {
						if(src.indexOf(opts.rollOverImg) > -1) {
							re = new RegExp("^(.*)" + opts.rollOverImg + ".(.*)$");
							var src_off = src.replace(re, "$1.$2");
							$(this).attr('src', src_off);
						}
					}
				});
			});
		},
		// preload & removeClass Method
		preload: function (options) {
			var opts = $.extend($.fn.on_rollover.defaults, options);

			return this.each(function() {
				var $this = $(this);

				var removeName = opts.rollOverObj.substring(1);
				return $this.find(opts.rollOverObj).each(function() {
					var src = $(this).attr('src');
					if(src.indexOf(opts.rollOverImg) < 0){
						var src_on = src.replace(/^(.+)(\.[a-z]+)$/, "$1" + opts.rollOverImg + "$2");
						$("<img>").attr('src', src_on);
					} else if(src.indexOf(opts.rollOverImg) > -1) {
						$(this).removeClass(removeName);
					}
				});
			});
		},
		// target set
		revert: function (options) {
			var opts = $.extend($.fn.on_rollover.defaults, options);
			var _$target = $(opts.target);
			var src = _$target.attr('src');
			var addName = opts.rollOverObj.substring(1);
			if(src.indexOf(opts.rollOverImg) > -1) {
				re = new RegExp("^(.*)" + opts.rollOverImg + ".(.*)$");
				var src_off = src.replace(re, "$1.$2");
				_$target.attr('src', src_off);
			}
				_$target.addClass(addName);
		},
		// target set
		status: function (options) {
			var opts = $.extend($.fn.on_rollover.defaults, options);
			var _$target = $(opts.target);
			var src = _$target.attr('src');
			var removeName = opts.rollOverObj.substring(1);
			if(src.indexOf(opts.rollOverImg) < 0) {
				var src_on = src.replace(/^(.+)(\.[a-z]+)$/, "$1" + opts.rollOverImg + "$2");
				_$target.attr('src', src_on);
			}
				_$target.removeClass(removeName);
		}
	};


	$.fn.on_rollover = function(method) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.on_rollover' );
		}
	};

	$.fn.on_rollover.defaults = {
		rollOverObj: ".imgro",
		rollOverImg: "_f2"
	};

})(jQuery);
