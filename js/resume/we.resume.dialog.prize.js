    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Model.ModelBase;
        var _class = "WE.Resume.Prize.Model";  

        WE.namespace(_class, superClass.extend({
            
            name: _class, 

            defaults: function () {
                return {
                    name: null,
                    p_date_y: null,
                    p_date_m: null,
                    jibie: null
                };
            },

            TIPS: {
                NAME_EMPTY: "请输入奖项名称",
                JIBIE_EMPTY: "请输入奖项级别",
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
                var key = 'name';
                if (_.has(data, key)) {
                    if (!data.name || !data.name.length) {
                        return getResult(key, self.TIPS.NAME_EMPTY);
                    }
                }

                //验证职位有效性
                var key = 'jibie';
                if (_.has(data, key)) {
                    if (!data.jibie || !data.jibie.length) {
                        return getResult(key, self.TIPS.JIBIE_EMPTY);
                    }
                }
            }

        }));
    })(WE, jQuery, Backbone);

    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Resume.Dialog;
        var _class = "WE.Resume.Prize.View";  

        WE.namespace(_class, superClass.extend({
            
            name: _class,

            initialize: function (options) {

                this.key = options.key;
                this.title = options.text;
                this.width = options.width;
            	this.model = new WE.Resume.Prize.Model();

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
                this.ui.txtpJibie = this.getCidEl("jibie", this.ui.wrap);
                this.ui.divDate = this.getCidEl("date", this.ui.wrap);
                this.ui.divMenu =  this.getCidEl("menu", this.ui.wrap);
            	this.ui.txtInput = this.ui.wrap.find("input[type='text'],textarea");

                this.show();
                this.createDate();
                this.createMenu();
                this.initPageEvents();
            },

            createDate: function () {
                var _this = this;

                this.date = new WE.Resume.Date({
                    container: this.ui.divDate,
                    onChange: function (data) {
                        _this.model.set({
                            p_date_y: data.year,
                            p_date_m: data.month
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
                    _this.instance.trigger("remove:data", {
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

            save: function (data) {
                var options = {};
                var date = this.date.getData();

                this.model.set({
                    p_date_y: date.year,
                    p_date_m: date.month
                });

                options.data = this.model.toJSON();
                options.data.m_id = this.getMid();

                options.success = function (result) {
                    this.reset();
                    this.instance.trigger("change:data", {key: this.key});
                    WE.UI.show(this.model.TIPS.SAVE_SUCCESS, {delay: 2000});
                };

                options.error = function (result) {
                    WE.UI.show(this.model.TIPS.SAVE_FAIL, {delay: 2000});
                };

                WE.Api.prize(options, this);
            },

            setValue: function (data) {
                this.date.setData({
                    year: data.p_date_y,
                    month: data.p_date_m
                });
            },

            changeUI: function (args) {
                this.list.render({data: this.getMenuData()});
            },

            onClose: function () {
                this.instance.off("change:ui", this.changeUI);
            },

            template: ['<div class="clearfix">',
                '<div class="windowBoxA_from">',
                    '<ul class="fromList">',
                        '<li class="on">',
                            '<label>奖项名称*</label>',
                            '<input type="text" id="<%-cid%>-name" name="name" class="input mt_5" />',
                        '</li>',
                        '<li>',
                            '<label>获得时间*</label>',
                            '<div class="clearfix mt_5" id="<%-cid%>-date">',
                            '</div>',
                        '</li>',
                        '<li>',
                            '<label>奖项级别*</label>',
                            '<input type="text" id="<%-cid%>-jibie" name="jibie" class="input mt_5" />',
                       '</li>',
                    '</ul>',
                    '<div class="windowBoxA_from_bottom" style="left:115px;">',
                        '<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM"> 保存</a>',
                    '</div>',
                '</div>',
                '<div class="windowBoxA_menu">',
                    '<ul id="<%-cid%>-menu"></ul>',
                '</div>',
            '</div>'].join("\n"),
        }));


})(WE, jQuery, Backbone);

