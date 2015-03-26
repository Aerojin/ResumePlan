;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Account.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                password: null,
                newPassword: null,
                affirmPassword: null
            };
        },    

        TIPS: {
            PASSWORD_EQUAL: "两次密码不一致",
            PASSWORD_EMPTY: "旧密码不能为空",
            NEW_PASSWORD_EMPTY: "新密码不能为空",
            AFFIRM_PASSWORD_EMPTY: "确认密码不能为空",

        },

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
            var getResult = function (target, message) {
                //校验错误后backbone不会将错误数据set到model中，所以此处需要偷偷的设置进去,
                //以便于后续提交时能统一校验model数据
                if (args.target == target) {
                    var obj = {};
                    obj[target] = attrs[target];
                    self.set(obj, { silent: true });
                }
                
                var value = {};
                value[target] = message;
                return value;
            }

            //验证旧密码有效性
            var key = 'password';
            if (_.has(data, key)) {
                if (!data.password || !data.password.length) {
                    return getResult(key, self.TIPS.PASSWORD_EMPTY);
                }
            }

            //验证新密码有效性
            var key = 'newPassword';
            if (_.has(data, key)) {
                if (!data.newPassword || !data.newPassword.length) {
                    return getResult(key, self.TIPS.NEW_PASSWORD_EMPTY);
                }
            }

            //验证确认密码有效性
            var key = 'affirmPassword';
            if (_.has(data, key)) {
                if (!data.affirmPassword || !data.affirmPassword.length) {
                    return getResult(key, self.TIPS.AFFIRM_PASSWORD_EMPTY);
                }

                if(data.affirmPassword != this.get("newPassword")){
                    return getResult(key, self.TIPS.PASSWORD_EQUAL);
                }
            }
        }

    }));


})(WE, jQuery, Backbone);


;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Account.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.password.blur(function () {
                var obj = {};
                var name = $(this).attr('name');
                var value = $(this).val().trim();

                obj[name] = value;
                _this.model.set(obj, {validate: true, target: name});
            });

            this.ui.password.focus(function () {
                var name = $(this).attr('name');
                _this.hideTip(_this.byName(name));
            });

            this.model.on('invalid', function(model, error){
                for(var key in error){
                    _this.showTip(_this.byName(key), error[key]);
                }                
            });

            this.ui.btnSave.click(function () {
                if(_this.model.isValid()){
                    _this.changePassword();
                }
            });
        },

        render: function () {
            var _this = this;

            this.ui = {};
            this.ui.txtOld = $('#txt-old');
            this.ui.txtNew = $('#txt-new');
            this.ui.txtAffirm = $('#txt-affirm');
            this.ui.btnSave = $('#btn-save');
            this.ui.password = $('.password');
            this.ui.btnFile = $("#btn-file");
            this.ui.imgPhoto = $("#img-photo");
            this.ui.userPhoto = $("#user-photo");

            this.upload = new WE.Upload({
                isSave: 1,
                image: this.ui.imgPhoto,
                upLoadFile:  this.ui.btnFile,
                callback: function (data) {
                    _this.ui.imgPhoto.show();
                    _this.ui.userPhoto.find("img").attr({src: data.photo}).show();
                    $.cookie(WE.Constant.COOKIE_PHOTO, data.photo);
                }
            });

            this.setPhoto();
        },
        showTip: function (dom, msg) {
            dom.closest("li").find(".error-tip").show().text(msg);
        },
        hideTip: function (dom) {
            dom.closest("li").find(".error-tip").hide().text("");
        },
        byName: function(name){
            return $('input[name=' + name + ']');
        },
        changePassword: function () {
            var options = {};
            var data = this.model.toJSON();

            options.data = {
                oldpass: data.password,
                newpass: data.newPassword,
                newpass2: data.affirmPassword
            };

            options.success = function (result) {
                WE.UI.alert("密码修改成功!", {
                    type: "warn",
                    callback: function () {
                        window.location.reload();
                    }
                });
            };

            options.error = function (result) {
                WE.UI.alert(result.msg, {type: "warn"});
            };

            WE.Api.changePassword(options, this);
        },
        setPhoto: function () {
            var photo = $.cookie(WE.Constant.COOKIE_PHOTO) || "";

            if(photo.trim().length > 0){
                this.ui.imgPhoto.show().attr({
                    src: photo
                });
            }else{
                this.ui.imgPhoto.hide() 
            }

        }


    }));


    $(function () {
        var model = new WE.Account.Model();
        var view = new WE.Account.View({model: model});
    });


})(WE, jQuery, Backbone);