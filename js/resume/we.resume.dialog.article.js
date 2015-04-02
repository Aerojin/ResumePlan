    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Model.ModelBase;
        var _class = "WE.Resume.Article.Model";  

        WE.namespace(_class, superClass.extend({
            
            name: _class, 

            defaults: function () {
                return {
                    title: null,
                    paper_name: null,
                    e_date_y: null,
                    e_date_m: null
                };
            },

            TIPS: {
                TITLE_EMPTY: "请输入文章名称",
                NAME_EMPTY: "报刊名称／刊号",
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
                var key = 'title';
                if (_.has(data, key)) {
                    if (!data.title || !data.title.length) {
                        return getResult(key, self.TIPS.TITLE_EMPTY);
                    }
                }

                //验证名称有效性
                var key = 'paper_name';
                if (_.has(data, key)) {
                    if (!data.paper_name || !data.paper_name.length) {
                        return getResult(key, self.TIPS.NAME_EMPTY);
                    }
                }
            }

        }));
    })(WE, jQuery, Backbone);

    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Resume.Dialog;
        var _class = "WE.Resume.Article.View";  

        WE.namespace(_class, superClass.extend({
            
            name: _class,

            initialize: function (options) {

                this.key = options.key;
                this.title = options.text;
                this.width = options.width;
            	this.model = new WE.Resume.Article.Model();

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
                this.ui.txtTitle = this.getCidEl("title", this.ui.wrap);
                this.ui.txtName = this.getCidEl("name", this.ui.wrap);
                this.ui.divDate = this.getCidEl("date", this.ui.wrap);
                this.ui.divMenu =  this.getCidEl("menu", this.ui.wrap);
            	this.ui.txtInput = this.ui.wrap.find("input[type='text'],textarea");

                this.show();
                this.createMenu();
                this.createDate();
                this.initPageEvents();
            },

            createDate: function () {
                var _this = this;

                this.date = new WE.Resume.Date({
                    container: this.ui.divDate,
                    onChange: function (data) {
                        _this.model.set({
                            e_date_y: data.year,
                            e_date_m: data.month
                        });
                    } 
                });
            },

            createMenu: function () {
                var _this = this;

                this.list = new WE.Resume.List({
                    data: this.getData(),
                    container: this.ui.divMenu
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

            save: function (data) {
                var options = {};
                var date = this.date.getData();

                this.model.set({
                    e_date_y: date.year,
                    e_date_m: date.month
                })

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

                WE.Api.article(options, this);
            },

            setValue: function (data) {
                this.date.setData({
                    year: data.e_date_y,
                    month: data.e_date_m
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
                    '<li>',
                        '<label>文章名称*</label>',
                        '<input type="text" id="<%-cid%>-title" name="title" class="input mt_5" />',
                    '</li>',
                    '<li>',
                        '<label>发表时间*</label>',
                        '<div class="clearfix mt_5" id="<%-cid%>-date">',
                        '</div>',
                    '</li>',
                    '<li>',
                        '<label>报刊名称／刊号*</label>',
                        '<input type="text" id="<%-cid%>-name" name="paper_name" class="input mt_5" />',
                    '</li>',
                '</ul>',
                '<div class="windowBoxA_from_bottom">',
                    '<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM"> 保存</a>',
                '</div>',
            '</div>',
            '<div class="windowBoxA_menu">',
                '<ul id="<%-cid%>-menu"></ul>',
            '</div>',
        '</div>'].join("\n")
    }));
})(WE, jQuery, Backbone);

