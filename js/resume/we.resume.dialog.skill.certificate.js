;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Certificate.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                name: null
            };
        },

        TIPS: {
            NAME_EMPTY: "请输入证书名称",
            SAVE_SUCCESS: "保存成功",
            SAVE_FAIL: "保存失败"
        },

        key: "certificate",

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

            //验证名称有效性
            var key = 'name';
            if (_.has(data, key)) {
                if (!data.name || !data.name.length) {
                    return getResult(key, self.TIPS.NAME_EMPTY);
                }
            }
        }

    }));
})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Certificate.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {

            this.menu = options.menu;
            this.master = options.master;
            this.container = options.container;
            this.model = new WE.Resume.Certificate.Model();

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.txtInput.focus(function () {
                var name = $(this).attr('name');
                _this.master.hideTip(_this.master.byName(name));
            });

            this.ui.txtInput.blur(function () {
                var obj = {};
                var name = $(this).attr('name');
                var value = $(this).val().trim();

                obj[name] = value;
                _this.model.set(obj, {validate: true, target: name});              
            });

            this.model.on('invalid', function(model, error){
                for(var key in error){
                    _this.master.showTip(_this.master.byName(key), error[key]);
                }                
            });
        },

        render: function () {
            var template = _.template(this.template);
                template = template({cid: this.cid});

            this.el = $(template);
            this.ui = {};
            this.ui.wrap = this.el;
            this.ui.divMenu = this.menu;
            this.ui.txtName = this.getCidEl("name", this.ui.wrap);
            this.ui.txtInput = this.ui.wrap.find("input[type='text'],textarea");

            this.createMenu();
            this.container.empty().append(this.ui.wrap);
        },

        createMenu: function () {
            var _this = this;

            this.list = new WE.Resume.List({
                container: this.ui.divMenu,
                data: this.getMenuData()
            });

            this.list.onRemove = function (data) {
                _this.master.instance.trigger("remove:data", {
                    id: data.id,
                    key: _this.key
                });
            };

            this.list.onChange = function (data) {
                _this.model.set(data);
                _this.setValue(data);
            };
        },

        getMenuData: function () {
            var data = this.getData() || [];

            for(var i = 0; i < data.length; i++){
                data[i].title = data[i].name;
            }

            return data;
        },

        save: function () {
            if(this.model.isValid()){
                var options = {};

                options.data = this.model.toJSON();
                options.data.m_id = this.master.getMid();

                options.success = function (result) {
                    this.reset();
                    this.master.instance.trigger("change:data", {key: this.key});
                    WE.UI.show(this.model.TIPS.SAVE_SUCCESS, {delay: 2000});
                };

                options.error = function (result) {
                    WE.UI.show(this.model.TIPS.SAVE_FAIL, {delay: 2000});
                };

                WE.Api.certificate(options, this);
            }
        },

        getData: function () {
            return this.master.instance.getData(this.key);
        },

        setValue: function () {
            var data = this.getData();

            for(var key in data){
                var value = data[key] || "";
                var input = this.byName(key);

                if(input && input.length > 0){
                    input.val(value);
                }
            }
        },

        reset: function () {
            this.model.clear();
            this.ui.txtInput.val("");
        },

        changeUI: function () {
            this.list.render(args);
        },

        template: ['<li>',
                        '<label>证书名称**</label>',
                        '<input type="text" id="<%-cid%>-name" name="name" class="input mt_5" />',
                    '</li>'].join("\n")
    }));

})(WE, jQuery, Backbone);

