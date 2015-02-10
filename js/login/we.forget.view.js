/*
;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Register.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                state: null,
                username: null,
                password: null,
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
    var _class = "WE.Register.View";  

    WE.namespace(_class, WE.View.ViewBase.extend({
        
        name: _class,

        el: 'body',

        STATE: {
            LOGIN: "login",
            FORGET: "forget",
            REGISTER: "register"
        },

        el: "",

        initialize: function () {
            this.model = new WE.Login.Model();
            this.initEvents();
            this.render();
            this.initPageEvents();
        },

        initEvents: function () {
            var _this = this;

            this.model.on("change:state", function () {
                var state = this.get("state");
                var template = _this.template[state];
                
                _this[state].render.call(this, template);
            });            
        },

        initPageEvents: function () {
            var _this = this;

            this.ui.login.click(function () {
                _this.model.set({state: _this.STATE.LOGIN});
            });
        },

        render: function () {

            this.el = this.template;

            this.ui = {};
            this.ui.login = this.$el.find("#login");            
        },

        showDialog: function (options) {
            this.dialog = new WE.Login.Dialog({
                title: options.title,
                content: options.content,
                onClose: options.onClose
            });
        },
        login: {
            render: function (template) {
                this.showDialog({
                    title: "登陆",
                    content: template,
                    onClose: function () {

                    }
                });

                var _this = this;
                var ui = {};
                    ui.wrap = this.dialog.getContent();
                    ui.btnLogin = ui.wrap.find("#btn-login");
                    ui.btnRegister = ui.wrap.find("#btn-register");
                    ui.btnRefresh = ui.wrap.find("#btn-refresh");
                    ui.txtEmail = ui.wrap.find("#txt-email");
                    ui.txtPassword = ui.wrap.find("#txt-password");
                    ui.txtCode = ui.wrap.find("#txt-code");
                    ui.imgCode = ui.wrap.find("#img-code");
                    


                ui.btnLogin.click(function () {
                    
                });

                ui.btnRegister.click(function () {
                    _this.model.set({state: _this.STATE.register});
                });

                ui.btnRefresh.click(function () {
                    
                });

            }
        },
        register: {
            render: function (template) {

            }
        },
        forget: {
            render: function (template) {

            }
        }

        template: {
            login: '<ul class="windowFrom">\
                        <li>\
                            <div class="inputBox">\
                                <input type="text" placeholder="输入您的邮箱..." class="input" id="txt-email" />\
                                <i class="i_icoOk"></i>\
                                <p class="inputBox_p">邮箱已使用</p>\
                            </div>\
                        </li>\
                        <li>\
                            <div class="inputBox">\
                                <input type="password" placeholder="输入您的密码..." class="input" id="txt-password" />\
                                <i class="i_icoError"></i>\
                                <p class="inputBox_p">密码格式有误</p>\
                                <a href="javascript:void(0);" id="btn-forget" class="inputBox_span">忘记密码？</a>\
                            </div>\
                        </li>\
                        <li class="clearfix">\
                            <div class="inputBox inputBox_yz">\
                                <input type="text" placeholder="验证码" class="input" id="txt-code" />\
                            </div>\
                            <img src="../images/yz.png" id="img-code" alt="" title="" class="inputBox_img" />\
                            <a href="javascript:void(0);" id="btn-refresh" class="i_icoRefresh"></a>\
                        </li>\
                    </ul>\
                    <div class="window_btn">\
                        <a href="javascript:void(0);" id="btn-login" class="btnF">登录</a>\
                        <a href="javascript:void(0);" id="btn-register" class="btnF btnRegist">注册</a>\
                    </div>',
            register: '<div class="window registWindow" style="display:none;">\
                            <a href="javascript:void(0);" class="i_icoClose"></a>\
                            <h2>注册</h2>\
                            <ul class="windowFrom">\
                                <li>\
                                    <div class="inputBox">\
                                        <input type="text" name="" class="input" id="inputBox1" />\
                                        <label class="label" for="inputBox1">输入您的邮箱...</label>\
                                        <i class="i_icoOk"></i>\
                                        <p class="inputBox_p">邮箱已使用</p>\
                                    </div>\
                                </li>\
                                <li>\
                                    <div class="inputBox">\
                                        <input type="password" name="" class="input" id="inputBox2" />\
                                        <label class="label" for="inputBox2">输入您的密码...</label>\
                                        <i class="i_icoError"></i>\
                                        <p class="inputBox_p">密码格式有误</p>\
                                    </div>\
                                </li>\
                                <li class="clearfix">\
                                    <div class="inputBox inputBox_yz">\
                                        <input type="text" name="" class="input" id="inputBox3" />\
                                        <label class="label" for="inputBox3">验证码</label>\
                                    </div>\
                                    <img src="../images/yz.png" alt="" title="" class="inputBox_img" />\
                                    <a href="javascript:void(0);" class="i_icoRefresh"></a>\
                                </li>\
                            </ul>\
                            <div class="window_btn"><a href="javascript:void(0);" class="btnF btnLoginA">登录</a><a href="#" class="btnF">注册</a></div>\
                        </div>',
            forget: '<div class="window forgetWindow" style="display:none;">\
                        <a href="javascript:void(0);" class="i_icoClose"></a>\
                        <h2>忘记密码</h2>\
                        <ul class="windowFrom">\
                            <li>\
                                <div class="inputBox">\
                                    <input type="text" name="" class="input" id="inputBox1" />\
                                    <label class="label" for="inputBox1">输入您的邮箱...</label>\
                                    <i class="i_icoOk"></i>\
                                    <p class="inputBox_p">邮箱已使用</p>\
                                </div>\
                            </li>\
                            <li class="clearfix">\
                                <div class="inputBox inputBox_yz">\
                                    <input type="text" name="" class="input" id="inputBox3" />\
                                    <label class="label" for="inputBox3">验证码</label>\
                                </div>\
                                <img src="../images/yz.png" alt="" title="" class="inputBox_img" />\
                                <a href="javascript:void(0);" class="i_icoRefresh"></a>\
                            </li>\
                        </ul>\
                        <div class="window_btn window_btnNew"><a href="#" class="btnF btnSuccess">发送</a></div>\
                    </div>'
        }

    }));


})(WE, jQuery, Backbone);
*/

