;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Education.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
            	id: null,
                xuewei: null,
                xuexiao: null,
                gpa: null,
                zhuanyesort: null,
                e_start_y: null,
                e_start_m: null,
                e_end_y: null,
                e_end_m: null,
                zhuanye: null,
                e_context: null
            };
        },

        TIPS: {
            ACADEMIC_EMPTY: "学位不能为空",
            GRADUATE_EMPTY: "毕业时间不能为空",
            NAME_EMPTY: "学校名称不能为空",
            GPA_EMPTY: "GPA不能为空",
            GPA_ERROR: "GPA范围必须在0-4之间",
            SORT_EMPTY: "专业排名不能为空",
            PROFESSIONAL_ERROR: "专业不能为空",
          	ENTRANCE_EMPTY: "入学时间不能为空",
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
            var key = 'xuexiao';
            if (_.has(data, key)) {
                if (!data.xuexiao || !data.xuexiao.length) {
                    return getResult(key, self.TIPS.NAME_EMPTY);
                }
            }

            //验证学位有效性
            var key = 'xuewei';
            if (_.has(data, key)) {
                if (!data.xuewei || !data.xuewei) {
                    return getResult(key, self.TIPS.ACADEMIC_EMPTY);
                }
            }

            //验证专业有效性
            var key = 'zhuanye';
            if (_.has(data, key)) {
                if (!data.zhuanye || !data.zhuanye.length) {
                    return getResult(key, self.TIPS.PROFESSIONAL_ERROR);
                }
            }

            //验证装也排名有效性
            var key = 'gpa';
            if (_.has(data, key)) {
                if (!data.gpa || !data.gpa.length) {
                    return getResult(key, self.TIPS.GPA_EMPTY);
                }

                if (_.isNaN(data.gpa) || Number(data.gpa) < 0 || Number(data.gpa) > 4) {
                    return getResult(key, self.TIPS.GPA_ERROR);
                }
            }

            //验证gpa有效性
            var key = 'zhuanyesort';
            if (_.has(data, key)) {
                if (!data.zhuanyesort || !data.zhuanyesort.length) {
                    return getResult(key, self.TIPS.SORT_EMPTY);
                }
            }
        }

    }));
})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.Dialog;
    var _class = "WE.Resume.Education.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {

            this.key = options.key;
            this.title = options.text;
            this.width = options.width;
        	this.model = new WE.Resume.Education.Model();

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
        	this.ui.divStart = this.getCidEl("start", this.ui.wrap);
        	this.ui.divEnd = this.getCidEl("end", this.ui.wrap);
        	this.ui.txtAcademic = this.getCidEl("academic", this.ui.wrap);
        	this.ui.txtName = this.getCidEl("name", this.ui.wrap);
        	this.ui.txtGpa = this.getCidEl("gpa", this.ui.wrap);
        	this.ui.txtSort = this.getCidEl("sort", this.ui.wrap);
        	this.ui.txtProfessional = this.getCidEl("professional", this.ui.wrap);
        	this.ui.txtInput = this.ui.wrap.find("input[type='text']");
        	this.ui.menu = this.getCidEl("menu", this.ui.wrap);


            this.show();
        	this.createDate();
            this.createMenu();
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
                container: this.ui.menu,
                data: this.getMenuData()
            });

            this.list.onRemove = function (data) {
                _this.instance.trigger("remove:data", {
                    id: data.id,
                    key: _this.key
                });
                _this.model.clear();
            };

            this.list.onChange = function (data) {
                _this.model.set(data);
                _this.setValue(data);
            };
        },

        getMenuData: function () {
            var data = this.getData() || [];

            for(var i = 0; i < data.length; i++){
                data[i].title = data[i].xuexiao;
            }

            return data;
        },

        save: function (data) {
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
                this.instance.trigger("change:data", {key: this.key});
                WE.UI.show(this.model.TIPS.SAVE_SUCCESS, {delay: 2000});
            };

            options.error = function (result) {
                WE.UI.show(this.model.TIPS.SAVE_FAIL, {delay: 2000});
            };

            WE.Api.education(options, this);
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

        changeUI: function (args) {
            this.list.render({data: this.getMenuData()});
        },

        onClose: function () {
            this.instance.off("change:ui", this.changeUI);
        },

        template: ['<div class="clearfix">',
		'<div class="windowBoxA_from_one">',
			'<ul class="fromList fromListBox clearfix">',
				'<li>',
					'<label>学位*</label>',
					'<input type="text" name="xuewei" id="<%-cid%>-xuewei" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>毕业*</label>',
					'<div class="clearfix mt_5" id="<%-cid%>-end">',
					'</div>',
				'</li>',
				'<li>',
					'<label>学校名称*</label>',
					'<input type="text" name="xuexiao" id="<%-cid%>-xuexiao" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>GPA*</label>',
                    '<input type="text" name="gpa" id="<%-cid%>-gpa" class="input mt_5" style="width:120px;" />',
				'</li>',
                '<li>',
                    '<label>专业排名*</label>',
                    '<input type="text" name="zhuanyesort" id="<%-cid%>-zhuanyesort" class="input mt_5" style="width:120px;" />',
                '</li>',
                '<li>',
                    '<label>专业*</label>',
                    '<input type="text" name="zhuanye" id="<%-cid%>-zhuanye" class="input mt_5" />',
                '</li>',
				'<li class="fromList_no"></li>',
				'<li>',
					'<label>入学*</label>',
					'<div class="clearfix mt_5" id="<%-cid%>-start">',
					'</div>',
				'</li>',
			'</ul>',
            '<div class="windowBoxA_from_bottom" style="left:300px;">',
                '<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM"> 保存</a>',
            '</div>',
		'</div>',
		'<div class="windowBoxA_menu">',
			'<ul id="<%-cid%>-menu">',
			'</ul>',
		'</div>',
	'</div>'].join("\n"),

	listTmpl: ['<li class="clearfix" data-id="<%-id%>">',
					'<a href="javascript:void(0)" data-id="<%-id%>" class="i_icoCloseSmall close"></a>',
					'<span><%-num%></span>',
					'<p><%-title%></p>',
				'</li>'].join("\n")

    }));


})(WE, jQuery, Backbone);

