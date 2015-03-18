;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Login.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                email: null,
                password: null,
                code: null
            };            
        },

        TITLE: "登陆",

        STATE: {
            LOGIN: "login",
            FORGET: "forget",
            REGISTER: "register"
        },

        initialize: function () {

        },

        initEvents: function () {

        },
        login: function (options, context) {
            WE.Api.Login({
                data: options.data,
                success: function (result) {
                    options.success(result.data);
                },
                error: function () {
                    options
                }
            })
        }


    }));


})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Login.View";  

    WE.namespace(_class, WE.View.ViewBase.extend({
        
        name: _class,        

        STATE: {
            LOGIN: "login",
            FORGET: "forget",
            REGISTER: "register"
        },

        el: '<ul class="windowFrom">\
                <li>\
                    <div class="inputBox">\
                        <input type="text" data-key="email" placeholder="输入您的邮箱..." class="input txt-input" id="txt-email" />\
                        <i class="i_icoOk ico" style="display:none;"></i>\
                        <p class="inputBox_p hide error-tip">邮箱已使用</p>\
                    </div>\
                </li>\
                <li>\
                    <div class="inputBox">\
                        <input type="password" data-key="password" placeholder="输入您的密码..." class="input txt-input" id="txt-password" />\
                        <i class="i_icoError ico" style="display:none;"></i>\
                        <p class="inputBox_p hide error-tip">密码格式有误</p>\
                        <a href="javascript:void(0);" id="btn-forget" class="inputBox_span">忘记密码？</a>\
                    </div>\
                </li>\
                <li class="clearfix">\
                    <div class="inputBox inputBox_yz">\
                        <input type="text"  data-key="code" placeholder="验证码" class="input txt-input" id="txt-code" />\
                        <p class="inputBox_p hide error-tip">密码格式有误</p>\
                    </div>\
                    <img src="/api.php?m=user&a=verifyCode&type=login" id="img-code" alt="" title="" class="inputBox_img" />\
                    <a href="javascript:void(0);" id="btn-refresh" class="i_icoRefresh"></a>\
                </li>\
            </ul>\
            <div class="window_btn">\
                <a href="javascript:void(0);" id="btn-login" class="btnF">登录</a>\
                <a href="javascript:void(0);" id="btn-register" class="btnF btnRegist">注册</a>\
            </div>',

        verifyCode: "/api.php?m=user&a=verifyCode&type=login",

        initialize: function (options) {
            this.dialog = options.dialog;
            this.model = new WE.Login.Model();

            this.initEvents();
            this.render();
            this.initPageEvents();
        },

        initEvents: function () {
            var _this = this;
          
        },

        initPageEvents: function () {
            var _this = this;
            var model = this.model;

            this.ui.btnLogin.click(function () {
                if(_this.validate()){
                    _this.login();
                }
            });

            this.ui.btnRefresh.click(function () {
                _this.ui.imgCode.attr({
                    src: _this.verifyCode + "&t=" + new Date().getTime()
                });
            });

            this.ui.btnForget.click(function () {
                _this.trigger("forget");
            });

            this.ui.btnRegister.click(function () {
                _this.trigger("register");
            });

            this.ui.txtInput.focus(function () {
                _this.hideTip(_this.ui.txtInput);
            });

            this.ui.txtInput.blur(function () {
                var key  = $(this).data("key");
                var obj = {};
                    obj[key] = $(this).val().trim();                

                model.set(obj);                
            });
        },

        render: function () {
            this.ui = {};
            this.ui.btnLogin = this.$el.find("#btn-login");
            this.ui.btnForget = this.$el.find("#btn-forget");
            this.ui.btnRefresh = this.$el.find("#btn-refresh");
            this.ui.btnRegister = this.$el.find("#btn-register");
            this.ui.txtUserName = this.$el.find("#txt-email");
            this.ui.txtCode = this.$el.find("#txt-code");
            this.ui.imgCode = this.$el.find("#img-code");
            this.ui.txtPassword = this.$el.find("#txt-password");
            this.ui.txtInput = this.$el.find(".txt-input");

            this.dialog.setContent(this.$el);
            this.dialog.setTitle(this.model.TITLE);
        },

        validate: function () {
            var renValue = true;
            var code = this.ui.txtCode.val().trim();
            var username = this.ui.txtUserName.val().trim();
            var password = this.ui.txtPassword.val().trim();

            if(username.length == 0){
                renValue = false;
                this.showTip(this.ui.txtUserName, "请输入电子邮件");                
            }

            if(password.length == 0){
                renValue = false;
                this.showTip(this.ui.txtPassword, "请输入密码");                
            }

            if(code.length == 0){
                renValue = false;
                this.showTip(this.ui.txtCode, "请输入验证码");
            }

            return renValue;
        },

        showTip: function (dom, text) {
            dom.nextAll(".error-tip").text(text).css({
                "display": "block"
            });
        },

        hideTip: function (dom) {
            dom.nextAll(".error-tip").text("").css({
                "display": "none"
            });
        },
        login: function () {
            var options = {};

            options.data = this.model.toJSON();

            options.success = function (result) {
                $.cookie(WE.Constant.COOKIE_USER, result.data.u_email);
                $.cookie(WE.Constant.COOKIE_USERID, result.data.u_id);
                $.cookie(WE.Constant.COOKIE_PHOTO, result.data.logo);
                $.cookie(WE.Constant.COOKIE_TOKEN, result.data.token);

                window.location.reload();
            };

            options.error = function (result) {
                switch(result.code){
                    case 2:
                        this.showTip(this.ui.txtUserName, result.msg);
                        break;
                    case 3: 
                        this.showTip(this.ui.txtPassword, result.msg);
                        break;
                    case 4: 
                        this.showTip(this.ui.txtCode, result.msg);
                        break;
                    default:
                        WE.UI.alert(result.msg, {type: "warn"});
                        break;
                }
            };

            WE.Api.Login(options, this);
        }
    }));
})(WE, jQuery, Backbone);


