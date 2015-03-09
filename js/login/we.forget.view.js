;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Forget.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                username: null,
                code: null,
                title: "忘记密码"
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

        el: 'body',

        el: '<ul class="windowFrom">\
                <li>\
                    <div class="inputBox">\
                        <input type="text" placeholder="输入您的邮箱..."  class="input" id="txt-username" />\
                        <p class="inputBox_p hide error-tip">邮箱已使用</p>\
                    </div>\
                </li>\
                <li class="clearfix">\
                    <div class="inputBox inputBox_yz">\
                        <input type="text"  placeholder="验证码" class="input" id="txt-code" />\
                        <p class="inputBox_p hide error-tip">邮箱已使用</p>\
                    </div>\
                    <img src="../images/yz.png" alt="" title="" id="img-code" class="inputBox_img" />\
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
                    </div>',

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
                /* Act on the event */
            });

            this.ui.btnSend.click(function(event) {
                if(_this.validate()){
                    _this.trigger('send');
                    _this.showSuccess();
                }
            });
        },

        render: function () {

            this.ui = {};
            this.ui.btnSend = this.$el.find("#btn-send");
            this.ui.btnRefresh = this.$el.find("#btn-refresh");
            this.ui.txtUserName = this.$el.find("#txt-username");
            this.ui.txtCode = this.$el.find("#txt-code");
            this.ui.imgCode = this.$el.find("#img-code");
            this.ui.txtInput = this.$el.find(".txt-input");

            this.dialog.setContent(this.$el);
            this.dialog.setTitle(this.model.get("title"));
        },
        showSuccess: function () {
            var template = _.template(this.template);
            var  wrap = $(template({cid: this.cid}));

            wrap.find('#btn-close').click(function(event) {
                wrap.remove();
            });

            $('body').append(wrap);

            this.hideSuccess(wrap);
        },

        hideSuccess: function (wrap) {
            var _this = this;
            setTimeout(function () {
                wrap.remove();
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
        }

    }));


})(WE, jQuery, Backbone);


