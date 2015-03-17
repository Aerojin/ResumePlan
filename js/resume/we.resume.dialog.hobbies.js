    ;(function (WE, jQuery, Backbone) {

        var superClass = WE.Model.ModelBase;
        var _class = "WE.Resume.Hobbies.Model";  

        WE.namespace(_class, superClass.extend({
            
            name: _class, 

            defaults: function () {
                return {
                    context: null
                };
            },

            TIPS: {
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
        var _class = "WE.Resume.Hobbies.View";  

        WE.namespace(_class, superClass.extend({
            
            name: _class,


            initialize: function (options) {

                this.options = options;
            	this.model = new WE.Resume.Hobbies.Model();

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
                this.ui.txtContext = this.getCidEl("context", this.ui.wrap);
            	this.ui.txtInput = this.ui.wrap.find("input[type='text'],textarea");

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
                        '<div class="windowBoxA_from">',
                            '<ul class="fromList">',
                                '<li>',
                                    '<label>描述*</label>',
                                    '<textarea id="<%-cid%>-context" name="context" rows="" cols="" class="textarea mt_5"></textarea>',
                                '</li>',
                            '</ul>',
                        '</div>',
                    '</div>',
                    '<p class="fromListBox_btn">',
                        '<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM"> 保存</a>',
                    '</p>'].join("\n"),

        tip: '<div class="tips"><%-msg%></div>'

        }));



})(WE, jQuery, Backbone);

