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
    },
    signIn: function( url, data, callback ) {
        // Sign in
        var u = data.s_u, p = md5(data.s_p);
        var cert;
        try
        {
            cert = btoa(u.concat(':', p));
        }
        catch (e)
        {
            cert = Base64.encode(u.concat(':', p));
        }
        delete data['s_u'];
        delete data['s_p'];
        data.cert = cert;

        return jQuery.restGet(url, data, callback);
    },
    signOut: function( url, data, callback ) {
        // Sign out
    },
    update:function(url,data,callback){
    	 var u = data.s_u, p = md5(data.s_p);
    	$.ajax({
    		 url: url+"/"+u+"/"+p+"/",
    		 type: "post",
    		 processData: false,
    		 success: callback   
    		}); 
    	 delete data['s_u'];
         delete data['s_p'];
    }
});