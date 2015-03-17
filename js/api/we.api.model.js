;(function(WE, $, Backbone){

	WE.namespace("WE.Api.HttpClient",WE.HttpClient.extend({
		initialize: function (options) {
			WE.HttpClient.prototype.initialize.apply(this, arguments);
		},
		request: function (options, callback) {
            var This = this;
            //请求父类的方法
            WE.HttpClient.prototype.request.apply(this, arguments);
            return this;
        }
	}));

    WE.namespace("WE.Api", {
        call: function (api, data, options, context) {
            options = options || {};
            var client = new WE.Api.HttpClient({});
            var httpMethod = options.httpMethod || "post";
            var url = this.getUrl(api);

            client.on('error', function() {
                if (options.error) {
                    options.error.apply(client, arguments);
                } else {
                    options.success.call(scope, { responseData: null, status: arguments[0].status, responseText: arguments[0].responseText });
                }
            });

            client.request({
                url: url,
                method: httpMethod,
                data: data,
                timeout: 20000,
            }, function (e) {
                var result = new WE.WebStatus();
                /*  result.set({
                        code: null,
                        data: null
                    });*/
                if(result.get("success")){
                    if(_.isFunction(options.success)){
                        options.success.call(context, result.toJSON());
                    }
                    return;
                }

                if(_.isFunction(options.error)){
                    options.error.call(context, result.toJSON());
                }
            });
        },
        getUrl: function (api) {
            return "{0}/api.php?m=user&a={1}".format(this.getHost, api);
        },
        getHost: function () {
            return "http://www.jianlipro.com";
        }
    });

    WE.Api.Login = function (options, context) {
        var data = options.data || {};
        var requestUrl = 'login';
        var requestBody = data;

        options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    WE.Api.Register = function (options, context) {
        var data = options.data || {};
        var requestUrl = 'regist';
        var requestBody = data;

        options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    WE.Api.Logout = function (options, context) {
        var data = options.data || {};
        var requestUrl = 'regist';
        var requestBody = data;

        options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    }; 
	
	
})(WE, jQuery, Backbone);