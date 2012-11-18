/*!
 * jQuery RollOver Plugin v1.0
 * https://github.com/norichika/jquery.on_rollover
 *
 * Copyright 2012, Norichika Yamanaka
 * Dual licensed under the MIT licenses.
 * http://www.opensource.org/licenses/mit-license.php
 */
(function($) {
	$.fn.on_rollover = function(options) {

		var opts = $.extend($.fn.on_rollover.defaults, options);

		//removeName
		var removeName = opts.rollOverObj.substring(1);

		this.on("mouseenter.on_rollover mouseleave.on_rollover", opts.rollOverObj,
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
			return this;
		});

		//preload
		this.find(opts.rollOverObj).each(function() {
			var src = $(this).attr('src');
			if(src.indexOf(opts.rollOverImg) < 0){
				var src_on = src.replace(/^(.+)(\.[a-z]+)$/, "$1" + opts.rollOverImg + "$2");
				$("<img>").attr('src', src_on);
			} else if(src.indexOf(opts.rollOverImg) > -1) {
				$(this).removeClass(removeName);
			}
		});

	};

	$.fn.on_rollover.defaults = {
		rollOverObj: ".imgro",
		rollOverImg: "_f2",
	}

})(jQuery)