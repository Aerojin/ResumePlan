    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Model.ModelBase;
        var _class = "WE.Resume.Research.Model";  

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
                NAME_EMPTY: "请输入课题名称",
                POSITION_EMPTY: "请输入职责",
                CONTEXT_EMPTY: "请输入描述",
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

        var superClass = WE.Resume.Dialog;
        var _class = "WE.Resume.Research.View";  

        WE.namespace(_class, superClass.extend({
            
            name: _class,

            initialize: function (options) {

                this.key = options.key;
                this.title = options.text;
                this.width = options.width;
            	this.model = new WE.Resume.Research.Model();

            	this.render();
            	this.initEvents();
            },

            initEvents: function () {
                this.instance.on("change:ui", this.changeUI, this);
            },

            initPageEvents: function () {
                var _this = this;

                this.ui.btnSave.click(function () {
                    if(_this.model.isValid()){
                        _this.save();
                    }
                });
            },

            render: function () {
            	var template = _.template(this.template);
            		template = template({cid: this.cid});

            	this.el = $(template);
            	this.ui = {};
            	this.ui.wrap = this.el;
            	this.ui.btnSave = this.getCidEl("save", this.ui.wrap);
                this.ui.txtName = this.getCidEl("name", this.ui.wrap);
                this.ui.txtpPosition = this.getCidEl("position", this.ui.wrap);
                this.ui.txtContext = this.getCidEl("context", this.ui.wrap);
                this.ui.divEnd = this.getCidEl("end", this.ui.wrap);
                this.ui.divStart = this.getCidEl("start", this.ui.wrap);
                this.ui.divMenu =  this.getCidEl("menu", this.ui.wrap);
            	this.ui.txtInput = this.ui.wrap.find("input[type='text'],textarea");

                this.show();
                this.createMenu();
                this.createDate();
                this.initPageEvents();
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
                    _this.instance.trgger("remove:data", {
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
                var options = {};
                var end = this.end.getData();
                var start = this.start.getData();

                this.model.set({
                    e_end_y: end.year,
                    e_end_m: end.month,
                    e_start_y: start.year,
                    e_start_m: start.month
                });

                options.data = this.model.toJSON();
                options.data.m_id = this.getMid();

                options.success = function (result) {
                    this.reset();
                    this.instance.trgger("change:data", {key: this.key});
                    WE.UI.show(this.model.TIPS.SAVE_SUCCESS, {delay: 2000});
                };

                options.error = function (result) {
                    WE.UI.show(this.model.TIPS.SAVE_FAIL, {delay: 2000});
                };

                WE.Api.research(options, this);
            },

            setValue: function (data) {

                for(var key in data){
                    var value = data[key] || "";
                    var input = this.byName(key);

                    if(input && input.length > 0){
                        input.val(value);
                    }
                }

                this.start.setData({
                    year: data.e_start_y,
                    month: data.e_start_m
                });

                this.end.setData({
                    year: data.e_end_y,
                    month: data.e_end_m
                });
            },
            changeUI: function (args) {
                this.list.render(args);
            },

            onClose: function () {
                this.instance.off("change:ui", this.changeUI);
            },

            template: ['<div class="clearfix">',
            '<div class="windowBoxA_from_one">',
                '<ul class="fromList fromListBox clearfix">',
                    '<li>',
                        '<label>课题名称*</label>',
                        '<input type="text" id="<%-cid%>-name" name="e_company" class="input mt_5" />',
                    '</li>',
                    '<li class="fromList_no"></li>',
                    '<li>',
                        '<label>职责*</label>',
                        '<input type="text" id="<%-cid%>-position" name="e_position" class="input mt_5" />',
                    '</li>',
                    '<li style="margin-top:-62px;">',
                        '<label>描述*</label>',
                        '<textarea id="<%-cid%>-context" name="e_context" rows="" cols="" class="textarea mt_5"></textarea>',
                    '</li>',
                    '<li>',
                        '<label>开始*</label>',
                        '<div class="clearfix mt_5" id="<%-cid%>-start">',
                        '</div>',
                    '</li>',
                    '<li class="fromList_no"></li>',
                    '<li>',
                        '<label>结束*</label>',
                        '<div class="clearfix mt_5" id="<%-cid%>-end">',
                        '</div>',
                    '</li>',
                '</ul>',
                '<div class="windowBoxA_from_bottom" style="left:300px;">',
                    '<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM"> 保存</a>',
                '</div>',
            '</div>',
            '<div class="windowBoxA_menu">',
                '<ul id="<%-cid%>-menu"></ul>',
            '</div>',
        '</div>'].join("\n")
    }));
})(WE, jQuery, Backbone);

