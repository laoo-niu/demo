/**
 *
 */
/*(function($) {
    $.fn.restGet = function( url, data, callback ) {
		if (data)
		{
			for (var a in data)
			{
				url = url.replace('{' + a + '}', data[a]);
				delete data[a];
			}
		}
		return $.getJSON( url, data, callback );
    };
})( jQuery );*/

jQuery.extend({
	restGet: function( url, data, callback ) {
		if (data) {
			for (var a in data) {
				url = url.replace('{' + a + '}', data[a]);
				delete data[a];
			}
		}
		return jQuery.getJSON( url, data, callback );
	}
});