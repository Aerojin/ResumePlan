;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Project.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                e_company: null,
                e_position: null,
                e_start_y: null,
                e_start_m: null,
                e_end_y: null,
                e_end_m: null,
                e_context: null
            };
        },

        TIPS: {
            NAME_EMPTY: "请输入项目名称",
            POSITION_EMPTY: "请输入职责",
            CONTEXT_EMPTY: "请输入工作描述",
            SAVE_SUCCESS: "保存成功",
            SAVE_FAIL: "保存失败"
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

            //验证名称有效性
            var key = 'e_company';
            if (_.has(data, key)) {
                if (!data.e_company || !data.e_company.length) {
                    return getResult(key, self.TIPS.NAME_EMPTY);
                }
            }

            //验证职位有效性
            var key = 'e_position';
            if (_.has(data, key)) {
                if (!data.e_position || !data.e_position.length) {
                    return getResult(key, self.TIPS.POSITION_EMPTY);
                }
            }

            //验证工作描述有效性
            var key = 'e_context';
            if (_.has(data, key)) {
                if (!data.e_context || !data.e_context.length) {
                    return getResult(key, self.TIPS.CONTEXT_EMPTY);
                }
            }
        }

    }));
})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Project.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        key: "project",

        initialize: function (options) {

            this.menu = options.menu;
            this.master = options.master;
            this.container = options.container;
        	this.model = new WE.Resume.Project.Model();

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

            this.model.on("change", function () {
                var changed = this.changed;

                for(var key in changed){
                    var value = changed[key];
                    var dom = _this.master.byName(key);

                    if(dom.is("input") || dom.is("textarea")){
                        dom.val(value);
                    }
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
            this.ui.txtpPosition = this.getCidEl("position", this.ui.wrap);
            this.ui.txtContext = this.getCidEl("context", this.ui.wrap);
            this.ui.divEnd = this.getCidEl("end", this.ui.wrap);
            this.ui.divStart = this.getCidEl("start", this.ui.wrap);
        	this.ui.txtInput = this.ui.wrap.find("input[type='text'],textarea");

            this.createMenu();
            this.createDate();
            this.container.empty().append(this.ui.wrap);
        },

        createDate: function () {
            var _this = this;

            this.start = new WE.Resume.Date({
                container: this.ui.divStart,
                onChange: function (data) {
                    _this.model.set({
                        e_start_y: data.year,
                        e_start_m: data.month
                    });
                } 
            });

            this.end = new WE.Resume.Date({
                container: this.ui.divEnd,
                onChange: function (data) {
                    _this.model.set({
                        e_end_y: data.year,
                        e_end_m: data.month
                    });
                } 
            });
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
                data[i].title = data[i].e_company;
            }

            return data;
        },

        getData: function () {
            return this.master.instance.getData(this.key);
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

                WE.Api.project(options, this);
            }
        },

        setValue: function (data) {
            this.start.setData({
                year: data.e_start_y,
                month: data.e_start_m
            });

            this.end.setData({
                year: data.e_end_y,
                month: data.e_end_m
            });
        },

        reset: function () {
            this.model.clear();
            this.ui.txtInput.val("");
        },

        changeUI: function (args) {
            this.list.render({data: this.getMenuData()});
        },

        template: ['<li>',
                        '<label>项目名称**</label>',
                        '<input type="text" id="<%-cid%>-name" name="e_company" class="input mt_5" />',
                    '</li>',
                    '<li class="fromList_no"></li>',
                    '<li>',
                        '<label>职责*</label>',
                        '<input type="text" id="<%-cid%>-position" name="e_position" class="input mt_5" />',
                    '</li>',
                    '<li style="margin-top:-62px;">',
                        '<label>工作描述*</label>',
                        '<textarea id="<%-cid%>-context" name="e_context" rows="" cols="" class="textarea mt_5"></textarea>',
                    '</li>',
                    '<li>',
                        '<label>开始时间*</label>',
                        '<div class="clearfix mt_5" id="<%-cid%>-end">',
                        '</div>',
                    '</li>',
                    '<li class="fromList_no"></li>',
                    '<li>',
                        '<label>结束时间*</label>',
                        '<div class="clearfix mt_5" id="<%-cid%>-start">',
                        '</div>',
                    '</li>'].join("\n")
    }));

})(WE, jQuery, Backbone);

