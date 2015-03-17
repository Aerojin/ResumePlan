    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Model.ModelBase;
        var _class = "WE.Resume.Research.Model";  

        WE.namespace(_class, superClass.extend({
            
            name: _class, 

            defaults: function () {
                return {
                    name: null,
                    position: null,
                    startY: null,
                    startM: null,
                    endY: null,
                    endM: null,
                    context: null
                };
            },

            TIPS: {
                NAME_EMPTY: "请输入课题名称",
                POSITION_EMPTY: "请输入职责",
                CONTEXT_EMPTY: "请输入描述"
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
                var key = 'position';
                if (_.has(data, key)) {
                    if (!data.position || !data.position.length) {
                        return getResult(key, self.TIPS.POSITION_EMPTY);
                    }
                }

                //验证工作描述有效性
                var key = 'context';
                if (_.has(data, key)) {
                    if (!data.context || !data.context.length) {
                        return getResult(key, self.TIPS.CONTEXT_EMPTY);
                    }
                }
            }

        }));
    })(WE, jQuery, Backbone);

    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.View.ViewBase;
        var _class = "WE.Resume.Research.View";  

        WE.namespace(_class, superClass.extend({
            
            name: _class,

            initialize: function (options) {

                this.options = options;
            	this.model = new WE.Resume.Research.Model();

            	this.render();
            	this.initEvents();
            },

            initEvents: function () {
            	var _this = this;


            	this.ui.btnSave.click(function () {
                    if(_this.model.isValid()){

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

                this.model.on('invalid', function(model, error){
                    for(var key in error){
                        _this.showTip(_this.byName(key), error[key]);
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

                this.createMenu();
                this.createDate();
            	this.showDialog();
            },

            showDialog: function () {
            	if(!this.dialog){
    	        	this.options.content = this.ui.wrap;
                    this.dialog = new WE.Resume.Dialog(this.options);

    	        	this.dialog.onClose = function () {

    	        	};

    	        	return;
    	        }

    	        this.dialog.show();
            },

            createDate: function () {
                var _this = this;

                this.start = new WE.Resume.Date({
                    container: this.ui.divStart,
                    onChange: function (data) {
                        _this.model.set({
                            startY: data.year,
                            startM: data.month
                        });
                    } 
                });

                this.end = new WE.Resume.Date({
                    container: this.ui.divEnd,
                    onChange: function (data) {
                        _this.model.set({
                            endY: data.year,
                            endM: data.month
                        });
                    } 
                });
            },

            createMenu: function () {
                var _this = this;

                this.list = new WE.Resume.List({
                    container: this.ui.divMenu,
                    data: [{
                        title: 111
                    },{
                        title: 222
                    }]
                });

                this.list.onRemove = function () {

                };

                this.list.onChange = function () {

                };
            },

            showTip: function (dom, msg) {
                var template = _.template(this.tip);
                    template = template({msg: msg});

                this.hideTip(dom);
                dom.after(template);
                dom.closest("li").addClass("on");
            },

            hideTip: function (dom) {
                dom.nextAll(".tips").remove();
                dom.closest("li").removeClass("on");
            },

            byName: function(name){
                return this.ui.wrap.find('[name=' + name + ']');
            },

            template: ['<div class="clearfix">',
            '<div class="windowBoxA_from_one">',
                '<ul class="fromList fromListBox clearfix">',
                    '<li>',
                        '<label>课题名称*</label>',
                        '<input type="text" id="<%-cid%>-name" name="name" class="input mt_5" />',
                    '</li>',
                    '<li class="fromList_no"></li>',
                    '<li>',
                        '<label>职责*</label>',
                        '<input type="text" id="<%-cid%>-position" name="position" class="input mt_5" />',
                    '</li>',
                    '<li style="margin-top:-62px;">',
                        '<label>描述*</label>',
                        '<textarea id="<%-cid%>-context" name="context" rows="" cols="" class="textarea mt_5"></textarea>',
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
        '</div>'].join("\n"),

        tip: '<div class="tips"><%-msg%></div>'

    }));
})(WE, jQuery, Backbone);

