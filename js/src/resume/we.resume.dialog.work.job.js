;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Job.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                company: null,
                position: null,
                startY: null,
                startM: null,
                endY: null,
                endM: null,
                context: null
            };
        },

        TIPS: {
            COMMPANY_EMPTY: "请输入公司名称",
            POSITION_EMPTY: "请输入职位",
            CONTEXT_EMPTY: "请输入工作描述"
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
            var key = 'company';
            if (_.has(data, key)) {
                if (!data.company || !data.company.length) {
                    return getResult(key, self.TIPS.COMMPANY_EMPTY);
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
    var _class = "WE.Resume.Job.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {

            this.menu = options.menu;
            this.container = options.container;
        	this.model = new WE.Resume.Job.Model();

        	this.render();
        	this.initEvents();
        },

        initEvents: function () {
        	var _this = this;

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
            this.ui.divMenu = this.menu;
            this.ui.txtName = this.getCidEl("cpmpany", this.ui.wrap);
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

        save: function () {
            if(this.model.isValid()){

            }
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

        template: ['<li>',
                        '<label>公司名称**</label>',
                        '<input type="text" id="<%-cid%>-cpmpany" name="company" class="input mt_5" />',
                    '</li>',
                    '<li>',
                        '<label>离职时间*</label>',
                        '<div class="clearfix mt_5" id="<%-cid%>-end">',
                        '</div>',
                    '</li>',
                    '<li>',
                        '<label>职位*</label>',
                        '<input type="text" id="<%-cid%>-position" name="position" class="input mt_5" />',
                    '</li>',
                    '<li class="fromList_no"></li>',
                    '<li>',
                        '<label>入职时间*</label>',
                        '<div class="clearfix mt_5" id="<%-cid%>-start">',
                        '</div>',
                    '</li>',
                    '<li style="margin-top:-62px;">',
                        '<label>工作描述*</label>',
                        '<textarea id="<%-cid%>-context" name="context" rows="" cols="" class="textarea mt_5"></textarea>',
                    '</li>'].join("\n"),

        tip: '<div class="tips"><%-msg%></div>'

    }));

})(WE, jQuery, Backbone);

