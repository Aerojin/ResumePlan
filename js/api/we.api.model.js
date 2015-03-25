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
    
    /*
        *登陆
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文
        
        *@param {Object} options.data 提交数据
        *@param {String} options.data.email 账户
        *@param {String} options.data.password 密码
        *@param {String} options.data.code 验证码
    */
    WE.Api.Login = function (options, context) {
        var data = options.data || {};
        var requestUrl = {model:'user', command:'login'};
        var requestBody = data;

        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *注册
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文
        
        *@param {Object} options.data 提交数据
        *@param {String} options.data.email 账户
        *@param {String} options.data.password 密码
        *@param {String} options.data.code 验证码
    */
    WE.Api.Register = function (options, context) {
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'regist'};

        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *忘记密码
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文
        
        *@param {Object} options.data 提交数据
        *@param {String} options.data.email 账户
        *@param {String} options.data.code 验证码
    */
    WE.Api.Forget = function (options, context) {
        var data = options.data || {};        
        var requestBody = data;
        var requestUrl = {model:'user', command:'forgetpwd'};

        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *重置密码
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文
        
        *@param {Object} options.data 提交数据
        *@param {String} options.data.password 密码
    */
    WE.Api.Reset = function (options, context) {
        var data = options.data || {};        
        var requestBody = data;
        var requestUrl = {model:'user', command:'resetpwd'};

        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *重置密码
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文
        
        *@param {Object} options.data 提交数据
    */
    WE.Api.Logout = function (options, context) {
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'forgetpwd'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    }; 

    /*
        *意见反馈
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文
        
        *@param {Object} options.data 提交数据
        *@param {String} options.data.text 反馈内容
    */
    WE.Api.Feedback = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'feedback'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *修改密码
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文
        
        *@param {Object} options.data 提交数据
        *@param {String} options.data.oldpass 旧密码
        *@param {String} options.data.newpass 新密码
        *@param {String} options.data.newpass2 确认密码
    */
    WE.Api.changePassword = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'uppwd'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *获取模版列表
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文
        
        *@param {Object} options.data 提交数据
        *@param {Int} options.data.type 模版类型
        *@param {Int} options.data.is_money 模版权限类型, 收费, 免费, 限时
        *@param {Int} options.data.pageIndex 当前页
        *@param {Int} options.data.pageSize 每页请求数量
    */
    WE.Api.getTempList = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'getTempList'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *更新收藏标识
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
        *@param {Int} options.data.id 模版ID
        *@param {Int} options.data.collect 收藏状态, 1: 收藏,  0: 未收藏
    */
    WE.Api.actionCollect  = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'liketem'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *简历开始
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
        *@param {Int} options.data.tid 模版ID
        *@param {String} options.data.name 姓名
        *@param {String} options.data.title 标题
        *@param {String} options.data.direction 求职意向
        *@param {String} options.data.language 语言
    */
    WE.Api.start  = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'main'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *获取用户所有的简历
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
    */
    WE.Api.getUserResume  = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'getlist'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *获取最新简历
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
    */
    WE.Api.getNewResume = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'user', command:'getNewResume'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *获取收藏简历
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
    */
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

    
    /*
        *删除简历
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
        *@param {Int} options.data.id 简历ID
    */
    WE.Api.removeResume = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'del_all'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *获取简历详情
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
        *@param {Int} options.data.mid 简历ID
        *@param {Int} options.data.importId 导入简历ID
    */
    WE.Api.getResumeDetail = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'getResumeDetail'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *获取模版
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
        *@param {Int} options.data.tid 模版ID        
    */
    WE.Api.getTemplate = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'getTemplate'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *自动保存
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
        *@param {Int} options.data.mid 简历ID
        *@param {Int} options.data.control 简历循序
        *@param {Int} options.data.control.Info 基础信息数据
        *@param {Int} options.data.control.Info.sort 排序位置
        *@param {Int} options.data.control.Info.show 是否显示
        *@param {Int} options.data.control.Info.drag 是否拖拽
        *@param {Int} options.data.control.InfoJiaoyu 教育经历
        *@param {Int} options.data.control.InfoXiaoyuan 校园经历
        *@param {Int} options.data.control.InfoGongzuo 工作经历
        *@param {Int} options.data.control.InfoXiangmu 项目经历
        *@param {Int} options.data.control.InfoJineng 技能
        *@param {Int} options.data.control.InfoZhengshu 证书
        *@param {Int} options.data.control.InfoPrize 获奖经历
        *@param {Int} options.data.control.InfoZwpingjia 自我评价
        *@param {Int} options.data.control.InfoKeyan 科研经历
        *@param {Int} options.data.control.InfoAihao 爱好
        *@param {Int} options.data.control.InfoArticle 发表文章
        *@param {Int} options.data.control.InfoCours 主修课程
    */
    WE.Api.autoSave = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'autoSave'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    /*
        *模块查询
        *@param {Object} options 初始化参数集
        *@param {Function} options.fail 业务错误回调函数
        *@param {Function} options.error 接口错误回调函数
        *@param {Function} options.success 业务成功回调函数
        *@param {Object} context 上下文

        *@param {Object} options.data 提交数据
        *@param {Int} options.data.mid 模版ID  
        *@param {Int} options.data.module 模块名  
    */
    WE.Api.remsumeSelect = function (options, context){
        var data = options.data || {};
        var requestBody = data;
        var requestUrl = {model:'resume', command:'remsumeSelect'};
        
        //options.httpMethod = "get";

        this.call(requestUrl, requestBody, options, context);
    };

    

    

    
	
})(WE, jQuery, Backbone);