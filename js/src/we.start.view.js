;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Start.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                name: null,
                position: null,
                language: null,
                imports: null
            };
        },  

        TIPS: {
            NAME_EMPTY: "姓名不能为空",
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

            //验证职位有效性
            var key = 'position';
            if (_.has(data, key)) {
                if (!data.position || !data.position.length) {
                    return getResult(key, self.TIPS.POSITION_EMPTY);
                }
            }

            //验证语言有效性
            var key = 'language';
            if (_.has(data, key)) {
                if (!data.language || !data.language.length) {
                    return getResult(key, self.TIPS.LANGUAGE_EMPTY);
                }
            }

            //验证导入类型有效性
            var key = 'imports';
            if (_.has(data, key)) {
                if (!data.imports || !data.imports.length) {
                    return getResult(key, self.TIPS.IMPORTS_EMPTY);
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
                    window.location.href="selected.html"
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
            var footer = this.ui.footer.height(); 
            var header = this.ui.header.height();
            var context = this.ui.main.find(".context").height();
            var height = win - footer - header - 115;
            
            this.ui.main.height(height);
            this.ui.main.css({top: (height - context - 50) / 2});
        },
        showTip: function (dom, msg) {
            dom.closest("li").find(".error-tip").show().text(msg);
        },
        hideTip: function (dom) {
            dom.closest("li").find(".error-tip").hide().text("");
        },
        byName: function(name){
            return this.ui.main.find('[name=' + name + ']');
        }

    }));

    $(function () {
        var model = new WE.Start.Model();
        var view = new WE.Start.View({model: model});
    });


})(WE, jQuery, Backbone);