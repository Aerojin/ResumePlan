;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Reset.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        TIPS: {
            CONFIRM_EMPTY: "请输入确认密码",
            CONFIRM_ERROR: "两次密码不一致"
        },

        initialize: function () {

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.btnSave.click(function () {
                if(_this.validate()){
                    _this.reset();
                }
            });

            this.ui.input.focus(function () {
                _this.ui.tip1.hide();
                _this.ui.tip2.hide();
            });
        },

        render: function () {

            this.ui = {};
            this.ui.input = $("input");
            this.ui.newPassword = $("#new-password");
            this.ui.confirmPassword = $("#confirm-password");
            this.ui.btnSave = $("#btn-save");
            this.ui.tip1 = $("#tip1");
            this.ui.tip2 = $("#tip2");
            this.ui.main = $("#main");
            this.ui.footer = $("#footer");
            this.ui.header = $("#header");

            var win = $(window).height();
            var footer = this.ui.footer.height(); 
            var header = this.ui.header.height();
            var context = this.ui.main.find(".context").height();
            var height = win - footer - header - 115;
            
            this.ui.main.height(height);
            /*            
            this.ui.main.css({
                "height": height,
                "padding-top": paddingTop / 2
            });*/
        },
        reset: function () {
            var options = {
                data: {
                    token: this.getRequest().token,
                    password: this.ui.newPassword.val().trim()
                }
            };

            options.success = function (result) {
                WE.UI.alert("密码重置成功!", {
                    callback: function () {
                        window.location.href="http://www.jianlipro.com/";
                    }
                });
            };

            options.error = function (result) {
                WE.UI.alert("密码重置失败,页面刷新后重试!", {
                    callback: function () {
                        window.location.reload();
                    }
                });
            };

            WE.Api.Reset(options);
        },
        validate: function () {
            var password1 = this.ui.newPassword.val().trim();
            var password2 = this.ui.confirmPassword.val().trim();

            if(password1.length == 0){
                this.ui.tip1.show();
                return false;
            }

            if(password2.length == 0){
                this.ui.tip2.show().text(this.TIPS.CONFIRM_EMPTY);
                return false;
            }

            if(password1 != password2){
                this.ui.tip2.show().text(this.TIPS.CONFIRM_ERROR);   
                return false;
            }

            return true;
        },
        getRequest: function () {
           var url = location.search; //获取url中"?"符后的字串
           var theRequest = new Object();
           if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              strs = str.split("&");
              for(var i = 0; i < strs.length; i ++) {
                 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
              }
           }
           return theRequest || {};
        }

    }));
    
    $(function () {
        new WE.Reset.View();
    });

})(WE, jQuery, Backbone);