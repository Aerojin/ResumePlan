;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Forget.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                email: null,
                code: null
            };            
        },      

        initialize: function () {

        },

        initEvents: function () {

        }

    }));


})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Forget.View";  

    WE.namespace(_class, WE.View.ViewBase.extend({
        
        name: _class,

        TITLE: "忘记密码",

        el: '<ul class="windowFrom">\
                <li>\
                    <div class="inputBox">\
                        <input type="text" name="email" placeholder="输入您的邮箱..."  class="input" id="txt-email" />\
                        <p class="inputBox_p hide error-tip">邮箱已使用</p>\
                    </div>\
                </li>\
                <li class="clearfix">\
                    <div class="inputBox inputBox_yz">\
                        <input type="text"  placeholder="验证码" class="input" id="txt-code" />\
                        <p class="inputBox_p hide error-tip">邮箱已使用</p>\
                    </div>\
                    <img src="/api.php?m=user&a=verifyCode&type=forgetpw" alt="" title="" id="img-code" class="inputBox_img" />\
                    <a href="javascript:void(0);" id="btn-refresh" class="i_icoRefresh"></a>\
                </li>\
            </ul>\
            <div class="window_btn window_btnNew">\
                <a href="javascript:void(0);" id="btn-send" class="btnF btnSuccess">发送</a>\
            </div>',

        template: '<div class="window successWindow" id="<%-cid%>-dialog">\
                        <a href="javascript:void(0);" id="btn-close" class="i_icoClose"></a>\
                        <i class="i_icoSuccess"></i>\
                        <p>邮件已发送，请到邮箱查收。</p>\
                    </div>\
                    <span class="blackBackground"></span>',

        verifyCode: "/api.php?m=user&a=verifyCode&type=forgetpw",

        initialize: function (options) {
            this.dialog = options.dialog;
            this.model = new WE.Forget.Model();

            this.initEvents();
            this.render();
            this.initPageEvents();
        },

        initEvents: function () {
            var _this = this;
            
        },

        initPageEvents: function () {
            var _this = this;

            this.ui.btnRefresh.click(function(event) {
                _this.ui.imgCode.attr({
                    src: _this.verifyCode + "&t=" + new Date().getTime()
                });
            });

            this.ui.btnSend.click(function(event) {
                if(_this.validate()){
                    _this.forget();
                }
            });
        },

        render: function () {

            this.ui = {};
            this.ui.html = $('html');
            this.ui.btnSend = this.$el.find("#btn-send");
            this.ui.btnRefresh = this.$el.find("#btn-refresh");
            this.ui.txtUserName = this.$el.find("#txt-email");
            this.ui.txtCode = this.$el.find("#txt-code");
            this.ui.imgCode = this.$el.find("#img-code");
            this.ui.txtInput = this.$el.find(".txt-input");

            this.dialog.setContent(this.$el);
            this.dialog.setTitle(this.TITLE);
        },
        showSuccess: function () {
            var template = _.template(this.template);
            var  wrap = $(template({cid: this.cid}));

            wrap.find('#btn-close').click(function(event) {
                wrap.remove();
            });

            $('body').append(wrap);
            this.ui.html.css({'padding-right': '17px','margin': '0px', 'overflow-y': 'hidden'});

            this.hideSuccess(wrap);
        },

        hideSuccess: function (wrap) {
            var _this = this;
            setTimeout(function () {
                wrap.remove();
                _this.ui.html.css({'padding-right': '0px', 'margin': '0px', 'overflow-y': 'auto'});
                _this.trigger("close");
            }, 3000);
        },

        validate: function () {
            var renValue = true;
            var code = this.ui.txtCode.val().trim();
            var username = this.ui.txtUserName.val().trim();

            if(username.length == 0){
                renValue = false;
                this.showTip(this.ui.txtUserName, "请输入电子邮件");                
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
        forget: function () {
            var options = {
                data: {
                    email: this.ui.txtUserName.val().trim(),
                    code: this.ui.txtCode.val().trim() 
                }
            };

            options.success = function (result) {
                this.trigger('send');
                this.showSuccess();
            };

            options.error = function (result) {
                WE.UI.alert(result.msg, {type: "warn"});
            };

            WE.Api.Forget(options, this);
        }

    }));


})(WE, jQuery, Backbone);


