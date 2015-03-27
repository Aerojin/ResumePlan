    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Model.ModelBase;
        var _class = "WE.Resume.Subject.Model";  

        WE.namespace(_class, superClass.extend({
            
            name: _class, 

            defaults: function () {
                return {
                    title: null
                };
            },

            TIPS: {
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
                var key = 'title';
                if (_.has(data, key)) {
                    if (!data.title || !data.title.length) {
                        return getResult(key, self.TIPS.CONTEXT_EMPTY);
                    }
                }
            }

        }));
    })(WE, jQuery, Backbone);

    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Resume.Dialog;
        var _class = "WE.Resume.Subject.View";  

        WE.namespace(_class, superClass.extend({
            
            name: _class,


            initialize: function (options) {

                this.key = options.key;
                this.title = options.text;
                this.width = options.width;
            	this.model = new WE.Resume.Subject.Model();

            	this.render();
            	this.initEvents();
            },

            initEvents: function () {
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
                this.ui.txtContext = this.getCidEl("context", this.ui.wrap);
            	this.ui.txtInput = this.ui.wrap.find("input[type='text'],textarea");

            	this.show();
                this.setValue();
            },

            save: function () {
                var options = {};

                options.data = this.model.toJSON();
                options.data.m_id = this.getMid();

                options.success = function (result) {
                    this.close();
                    this.instance.trgger("change:data", {key: this.key});
                    WE.UI.show(this.model.TIPS.SAVE_SUCCESS, {delay: 2000});
                };

                options.error = function (result) {
                    WE.UI.show(this.model.TIPS.SAVE_FAIL, {delay: 2000});
                };

                WE.Api.subject(options, this);
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

            template: ['<div class="clearfix">',
                        '<div class="windowBoxA_from">',
                            '<ul class="fromList">',
                                '<li>',
                                    '<label>描述*</label>',
                                    '<textarea id="<%-cid%>-context" name="title" rows="" cols="" class="textarea mt_5"></textarea>',
                                '</li>',
                            '</ul>',
                        '</div>',
                    '</div>',
                    '<p class="fromListBox_btn">',
                        '<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM"> 保存</a>',
                    '</p>'].join("\n")
        }));



})(WE, jQuery, Backbone);

