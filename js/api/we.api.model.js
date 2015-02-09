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

	WE.Api = Backbone.model.extend({
		defaults: function () {
			return {
				index: ""	
			};
		},
		initialize: function () {

		},
		call: function (api, data, options, context) {
			options = options || {};
            var client = new WE.Api.HttpClient({});
            var httpMethod = options.httpMethod || "post";
            var url = "";

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
                /*	result.set({
                		code: null,
						data: null
                	});*/
            	if(result.get("success")){
            		if(_.isFunction(options.success)){
            			options.success(context, result.toJSON());
            		}
            		return;
            	}

            	if(_.isFunction(options.error)){
					options.error.call(context, result.toJSON());
				}
            });
		}
	});
	
	
})(WE, jQuery, Backbone);