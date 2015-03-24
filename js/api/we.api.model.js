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
            var token = $.cookie(WE.Constant.COOKIE_TOKEN) || ""

            if(token.trim().length > 0 && !data.token){
                data.token = token;
            }

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
                var data = $.parseJSON(e.responseText);
                var result = new WE.WebStatus();
                    result.set({
                        code: data.status,
                        data: data.data || {},
                        msg: data.info || ""
                    });

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
            return "{0}/api.php?m={1}&a={2}".format(this.getHost, api.model, api.command);
        },
        getHost: function () {
            return "http://www.jianlipro.com";
        }
    });
    
    /*登陆*/
    WE.Api.Login = function (options, context) {
        var data = options.data || {};
        var requestUrl = {model:'user', command:'login'};
        var requestBody = data;

        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*注册*/
    WE.Api.Register = function (options, context) {
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'regist'};

        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*忘记密码*/
    WE.Api.Forget = function (options, context) {
        var data = options.data || {};        
        var requestBody = data;
        var requestUrl = {model:'user', command:'forgetpwd'};

        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*重置密码*/
    WE.Api.Reset = function (options, context) {
        var data = options.data || {};        
        var requestBody = data;
        var requestUrl = {model:'user', command:'resetpwd'};

        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*登出*/
    WE.Api.Logout = function (options, context) {
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'forgetpwd'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    }; 

    /*意见反馈*/
    WE.Api.Feedback = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'feedback'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*修改密码*/
    WE.Api.changePassword = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'uppwd'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*获取模版列表*/
    WE.Api.getTempList = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'getTempList'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*更新收藏标识*/
    WE.Api.actionCollect  = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'liketem'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*简历开始*/
    WE.Api.start  = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'main'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*获取用户所有的简历*/
    WE.Api.getUserResume  = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'getlist'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*获取最新简历*/
    WE.Api.getNewResume = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'getNewResume'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*获取收藏简历*/
    WE.Api.getCollectResume = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'getCollectResume'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*发送邮件*/
    WE.Api.sendMail = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'sendMail'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*简历下载*/
    WE.Api.download = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'download'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*主备简历切换*/
    WE.Api.actionMain = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'actionMain'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    
    /*删除简历*/
    WE.Api.removeResume = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'del_all'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*删除简历*/
    WE.Api.getResumeDetail = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'getResumeDetail'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    

    
	
})(WE, jQuery, Backbone);