;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Register.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                username: null,
                password: null,
                code: null,
                title: "注册"
            };            
        },

        TIPS: {
            SUCCESS: "验证通过",
            EMAIL_EMPTY: "请输入电子邮箱",
            EMAIL_ERROR: "请输入正确的邮箱",
            PASSWORD_EMPTY: "请输入密码",
            CODE_EMPTY: "请输入验证码"
        },

        isEmail:  /^[0-9a-zA-Z_][_.0-9a-zA-Z-]{0,31}@([0-9a-zA-Z][0-9a-zA-Z-]{0,30}\.){1,4}[a-zA-Z]{2,4}$/,

        initialize: function () {

        },

        initEvents: function () {

        },
        validate: function (attrs, args) {
            var self = this;
            var data = attrs;

            args = args || {};
            //判断是否需要验证
            if (!args.validate) {
                return;
            }

            //如果存在target，那说明我们只针对具体字段做校验
            if (args && args.target) {
                var key = args.target;
                var obj = {};
                obj[key] = attrs[key];
                data = obj;
            }

            //该方法用于获取返回的错误信息
            var getResult = function (target, message, success) {
                //校验错误后backbone不会将错误数据set到model中，所以此处需要偷偷的设置进去,
                //以便于后续提交时能统一校验model数据
                if (args.target == target) {
                    var obj = {};
                    obj[target] = attrs[target];
                    self.set(obj, { silent: true });
                }
                
                var value = {};
                value[target] = {
                    msg: message,
                    success: success
                };
                return value;
            }

            //验证用户名有效性
            var key = 'username';
            if (_.has(data, key)) {
                if (!data.username || !data.username.length) {
                    return getResult(key, self.TIPS.EMAIL_EMPTY);
                }

                if(data.username && !self.isEmail.test(data.username)){
                    return getResult(key, self.TIPS.EMAIL_ERROR);   
                }

                if (args && args.target) {
                    return getResult(key, self.TIPS.SUCCESS, true);
                }
            }

            //验证密码有效性
            var key = 'password';
            if (_.has(data, key)) {
                if (!data.password || !data.password.length) {
                    return getResult(key, self.TIPS.PASSWORD_EMPTY);
                }

                if (args && args.target) {
                    return getResult(key, self.TIPS.SUCCESS, true);
                }
            }

            //验证验证码有效性
            var key = 'code';
            if (_.has(data, key)) {
                if (!data.code || !data.code.length) {
                    return getResult(key, self.TIPS.CODE_EMPTY);
                }

                if (args && args.target) {
                    return getResult(key, self.TIPS.SUCCESS, true);
                }
            }
        },
        register: function (options, context) {
            options.data = {
                email: this.get("username"),
                password: this.get("password")
            };

            WE.Api.Register(options, context);
        }

    }));


})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Register.View";  

    WE.namespace(_class, WE.View.ViewBase.extend({
        
        name: _class,

        el: 'body',

        el: '<ul class="windowFrom">\
                <li>\
                    <div class="inputBox">\
                        <input type="text" name="username" placeholder="输入您的邮箱..." class="input txt-input" id="txt-username" />\
                        <i class="i_icoOk ico" style="display:none;"></i>\
                        <p class="inputBox_p hide error-tip">邮箱已使用</p>\
                    </div>\
                </li>\
                <li>\
                    <div class="inputBox">\
                        <input type="password" name="password" placeholder="输入您的密码..." class="input txt-input" id="txt-password" />\
                        <i class="i_icoError ico" style="display:none;"></i>\
                        <p class="inputBox_p hide error-tip">密码格式有误</p>\
                    </div>\
                </li>\
                <li class="clearfix">\
                    <div class="inputBox inputBox_yz">\
                        <input type="text"  name="code" placeholder="验证码" class="input txt-input" id="txt-code" />\
                        <p class="inputBox_p hide error-tip">密码格式有误</p>\
                    </div>\
                    <img src="../images/yz.png" id="img-code" alt="" title="" class="inputBox_img" />\
                    <a href="javascript:void(0);" id="btn-refresh" class="i_icoRefresh"></a>\
                </li>\
            </ul>\
            <div class="window_btn">\
                <a href="javascript:void(0);" id="btn-register" class="btnF">注册</a>\
                <a href="javascript:void(0);" id="btn-cancel" class="btnF">取消</a>\
            </div>',

        initialize: function (options) {
            this.dialog = options.dialog;
            this.model = new WE.Register.Model();            
            
            this.initEvents();
            this.render();
            this.initPageEvents();
        },

        initEvents: function () {
            var _this = this;

            this.model.on('invalid', function(model, error){
                for(var key in error){
                    _this.showTip(_this.byName(key), error[key]);
                }                
            });
        },

        initPageEvents: function () {
            var _this = this;
            var model = this.model;

            this.ui.btnCancel.click(function () {
                _this.trigger("cancel");
            });

            this.ui.btnRefresh.click(function () {

            });

            this.ui.btnRegister.click(function () {
                if(_this.model.isValid()){
                    _this.register()
                }
            });

            this.ui.txtInput.focus(function () {
                var name = $(this).attr('name');
                _this.hideTip(_this.byName(name));
            });

            this.ui.txtInput.blur(function () {
                var obj = {};
                var name = $(this).attr('name');
                var value = $(this).val().trim();

                obj[name] = value;
                _this.model.set(obj, {validate: true, target: name});              
            });
        },

        render: function () {

            this.ui = {};            
            this.ui.btnCancel = this.$el.find("#btn-cancel");
            this.ui.btnRefresh = this.$el.find("#btn-refresh");
            this.ui.btnRegister = this.$el.find("#btn-register");
            this.ui.txtUserName = this.$el.find("#txt-username");
            this.ui.txtCode = this.$el.find("#txt-code");
            this.ui.imgCode = this.$el.find("#img-code");
            this.ui.txtPassword = this.$el.find("#txt-password");
            this.ui.txtInput = this.$el.find(".txt-input");

            this.dialog.setContent(this.$el);
            this.dialog.setTitle(this.model.get("title"));
        },

        showTip: function (dom, options) {
            if(!options.success){
                dom.nextAll(".ico").show().removeClass("i_icoOk").addClass("i_icoError");
                dom.nextAll(".error-tip").text(options.msg).css({
                    "display": "block"
                });

                return;
            }

            dom.nextAll(".ico").show().addClass("i_icoOk").removeClass("i_icoError");
            dom.nextAll(".error-tip").text(options.msg).css({
                "display": "none"
            });
        },

        hideTip: function (dom) {
            dom.nextAll(".ico").hide();
            dom.nextAll(".error-tip").text("").css({
                "display": "none"
            });
        },

        byName: function(name){
            return this.$el.find('[name=' + name + ']');
        },

        getOptions: function () {
            return {
                content: this.$el,
                title: this.model.get("title"),
                onClose: function () {

                }
            };
        },
        register: function () {
            var _this = this;
            var options = {
                success: function () {

                },
                error: function () {

                }
            };

            this.model.register(options, this);
        }

    }));


})(WE, jQuery, Backbone);


