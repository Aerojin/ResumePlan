;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Start.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                name: null,
                title: null,
                position: null,
                language: "zh"
            };
        },  

        TIPS: {
            NAME_EMPTY: "姓名不能为空",
            TITLE_EMPTY: "标题不能为空",
            POSITION_EMPTY: "求职意向不能为空",
            LANGUAGE_EMPTY: "请选择语言",
            IMPORTS_EMPTY: "请选择导入"
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

            //验证姓名有效性
            var key = 'name';
            if (_.has(data, key)) {
                if (!data.name || !data.name.length) {
                    return getResult(key, self.TIPS.NAME_EMPTY);
                }
            }

            //验证姓名有效性
            var key = 'title';
            if (_.has(data, key)) {
                if (!data.title || !data.title.length) {
                    return getResult(key, self.TIPS.TITLE_EMPTY);
                }
            }

            //验证职位有效性
            var key = 'position';
            if (_.has(data, key)) {
                if (!data.position || !data.position.length) {
                    return getResult(key, self.TIPS.POSITION_EMPTY);
                }
            }
        }

    }));


})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Start.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;

            this.render();
            this.initEvents();
            this.getUserResume();
        },

        initEvents: function () {
            var _this = this;

            this.ui.main.find("input").blur(function () {
                var obj = {};
                var name = $(this).attr('name');
                var value = $(this).val().trim();

                obj[name] = value;
                _this.model.set(obj, {validate: true, target: name});
            });

            this.ui.main.find("input").focus(function () {
                var name = $(this).attr('name');
                _this.hideTip(_this.byName(name));
            });

            this.ui.main.find("select").change(function() {
                var obj = {};
                var name = $(this).attr('name');
                var value = $(this).val().trim();

                obj[name] = value;
                _this.hideTip(_this.byName(name));
                _this.model.set(obj, {validate: true, target: name});                
            });


            this.model.on('invalid', function(model, error){
                for(var key in error){
                    _this.showTip(_this.byName(key), error[key]);
                }                
            });

            this.ui.btnNext.click(function () {
                if(_this.model.isValid()){
                   _this.next();
                }
            });
        },

        render: function () {
            this.ui = {};
            this.ui.txtName = $("#txt-name");
            this.ui.txtPosition = $("#txt-position");
            this.ui.selLanguage = $("#sel-language");
            this.ui.selImports = $("#sel-imports");
            this.ui.btnNext = $("#btn-next");
            this.ui.main = $("#main");
            this.ui.footer = $("#footer");
            this.ui.header = $("#header");

            var win = $(window).height();
            var footer = this.ui.footer.outerHeight(true); 
            var header = this.ui.header.outerHeight(true);
            var context = this.ui.main.outerHeight(true);
            var height = win - footer - header;

            if(height > context){
                this.ui.main.height(height);
                this.ui.main.css({top: (height - context) / 2});
            }
        },
        showTip: function (dom, msg) {
            dom.closest("li").find(".error-tip").show().text(msg);
        },
        hideTip: function (dom) {
            dom.closest("li").find(".error-tip").hide().text("");
        },
        byName: function(name){
            return this.ui.main.find('[name=' + name + ']');
        },
        next: function () {
            var options = {};
            var data = this.model.toJSON();
            var tID = this.getRequest().t_id;
            var importsID = this.ui.selImports.val();

            options.data = {
                tid: tID,
                name: data.name,
                title:  data.title,
                direction: data.position,
                language: data.language,
                mid: importsID
            };

            options.success = function (result) {
                var url = "/resume.html?m_id={0}&t_id={1}".format(result.data, tID);
                window.location.href = url;
            };

            options.error = function (result) {
                WE.UI.alert(result.msg, {type: "warn"});
            };

            WE.Api.start(options, this);
        },
        getUserResume: function () {
            var _this = this;
            var option = '<option value="{0}">{1}</option>';
            var options = {
                data: {}
            };

            options.success = function (result) {
                if(result.data && result.data.length > 0){
                    _.each(result.data, function (e) {
                        _this.ui.selImports.append(option.format(e.id, e.title));
                    });
                }
            };

            options.error = function (result) {

            };

            WE.Api.getUserResume(options, this);
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
        var model = new WE.Start.Model();
        var view = new WE.Start.View({model: model});
    });


})(WE, jQuery, Backbone);