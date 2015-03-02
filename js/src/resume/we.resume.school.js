;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.School.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
            	title: "教育背景",
                name: null,
                sex: null,
                age: null,
                email: null,
                mobile: null,
                political: null,
                nation: null,
                address: null,
                photo: null
            };
        },

        TIPS: {
            NAME_EMPTY: "请输入姓名",
            SEX_EMPTY: "请输入性别",
            AGE_EMPTY: "请输入年龄",
            EMAIL_EMPTY: "请输入邮箱",
            MOBLIE_EMPTY: "请输入手机",
            EMAIL_ERROR: "邮箱格式错误"

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

            //验证姓名有效性
            var key = 'name';
            if (_.has(data, key)) {
                if (!data.name || !data.name.length) {
                    return getResult(key, self.TIPS.NAME_EMPTY);
                }
            }

            //验证性别有效性
            var key = 'sex';
            if (_.has(data, key)) {
                if (!data.sex || !data.sex.length) {
                    return getResult(key, self.TIPS.SEX_EMPTY);
                }
            }

            //验证年龄有效性
            var key = 'age';
            if (_.has(data, key)) {
                if (!data.age || !data.age.length) {
                    return getResult(key, self.TIPS.AGE_EMPTY);
                }
            }

            //验证邮件有效性
            var key = 'email';
            if (_.has(data, key)) {
                if (!data.email || !data.email.length) {
                    return getResult(key, self.TIPS.EMAIL_EMPTY);
                }

                if(data.email && !self.isEmail.test(data.email)){
                    return getResult(key, self.TIPS.EMAIL_ERROR);   
                }
            }

            //验证手机有效性
            var key = 'moblie';
            if (_.has(data, key)) {
                if (!data.moblie || !data.moblie.length) {
                    return getResult(key, self.TIPS.MOBLIE_EMPTY);
                }
            }
        }

    }));
})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.School.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        width: 863,

        initialize: function (options) {

        	this.model = new WE.Resume.School.Model();

        	this.render();
        	this.initEvents();
        },

        initEvents: function () {
        	var _this = this;


        	this.ui.btnSave.click(function () {

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
        	this.ui.txtInput = this.ui.wrap.find("input[type='text']");

        	this.showDialog();
        },

        showDialog: function () {
        	if(!this.dialog){
	        	this.dialog = new WE.Resume.Dialog({
	        		title: this.model.get("title"),
	        		content: this.ui.wrap,
	        		width: this.width
	        	});

	        	this.dialog.onClose = function () {

	        	};

	        	return;
	        }

	        this.dialog.show();
        },

        showTip: function () {

        },

        hideTip: function () {

        },

        byName: function(name){
            return this.$el.find('[name=' + name + ']');
        },

        template: ['<div class="clearfix">',
		'<div class="windowBoxA_from_one">',
			'<ul class="fromList fromListBox clearfix">',
				'<li>',
					'<label>学位*</label>',
					'<input type="text" name="" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>毕业*</label>',
					'<div class="clearfix mt_5">',
						'<select name="" id="" class="select gray">',
							'<option value="">2008</option>',
							'<option value="">2008</option>',
							'<option value="">2008</option>',
						'</select>',
						'<select name="" id="" class="select gray">',
							'<option value="">1</option>',
							'<option value="">1</option>',
							'<option value="">1</option>',
						'</select>',
					'</div>',
				'</li>',
				'<li>',
					'<label>学校名称*</label>',
					'<input type="text" name="" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>GPA*</label>',
					'<div class="clearfix mt_5">',
						'<select name="" id="" class="select gray" style="width:134px">',
							'<option value="">2.5/4.0</option>',
							'<option value="">2.5/4.0</option>',
							'<option value="">2.5/4.0</option>',
						'</select>',
					'</div>',
				'</li>',
				'<li>',
					'<label>专业排名*</label>',
					'<input type="text" name="" class="input mt_5" style="width:120px;" />',
				'</li>',
				'<li>',
					'<label>专业*</label>',
					'<input type="text" name="" class="input mt_5" />',
				'</li>',
				'<li class="fromList_no"></li>',
				'<li>',
					'<label>入学*</label>',
					'<div class="clearfix mt_5">',
						'<select name="" id="" class="select gray">',
							'<option value="">2008</option>',
							'<option value="">2008</option>',
							'<option value="">2008</option>',
						'</select>',
						'<select name="" id="" class="select gray">',
							'<option value="">1</option>',
							'<option value="">1</option>',
							'<option value="">1</option>',
						'</select>',
					'</div>',
				'</li>',
			'</ul>',
			'<div class="windowBoxA_from_bottom" style="left:380px;">',
				'<a href="javascript:void(0)" class="i_icoWadd"></a>',
				'<p>加一条～</p>',
			'</div>',
		'</div>',
		'<div class="windowBoxA_menu">',
			'<ul>',
				'<li class="clearfix focus">',
					'<a href="javascript:void(0)" class="i_icoCloseSmall"></a>',
					'<span>1</span>',
					'<p>武汉好在来酒屋</p>',
				'</li>',
				'<li class="clearfix">',
					'<a href="javascript:void(0)" class="i_icoCloseSmall"></a>',
					'<span>2</span>',
					'<p>武汉好在来酒屋</p>',
				'</li>',
				'<li class="clearfix hover">',
					'<a href="javascript:void(0)" class="i_icoCloseSmall"></a>',
					'<span>3</span>',
					'<p>武汉好在来酒屋</p>',
				'</li>',
				'<li class="clearfix">',
					'<a href="javascript:void(0)" class="i_icoCloseSmall"></a>',
					'<span>4</span>',
					'<p>武汉好在来酒屋</p>',
				'</li>',
			'</ul>',
			'<p class="windowBoxA_menu_btn"><a href="javascript:void(0);" id="<%-cid%>-save" class="btnM">保存</a></p>',
		'</div>',
	'</div>'].join("\n")

    }));


})(WE, jQuery, Backbone);

