;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Base.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
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

        isEmail:  /^[0-9a-zA-Z_][_.0-9a-zA-Z-]{0,31}@([0-9a-zA-Z][0-9a-zA-Z-]{0,30}\.){1,4}[a-zA-Z]{2,4}$/, 

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
    var _class = "WE.Resume.Base.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {
            this.options = options;
        	this.model = new WE.Resume.Base.Model();

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
        	this.ui.txtName = this.getCidEl("name", this.ui.wrap);
        	this.ui.txtmoblie = this.getCidEl("moblie", this.ui.wrap);
        	this.ui.txtSex = this.getCidEl("sex", this.ui.wrap);
        	this.ui.txtPolitical = this.getCidEl("political", this.ui.wrap);
        	this.ui.txtAge = this.getCidEl("age", this.ui.wrap);
        	this.ui.txtNation = this.getCidEl("nation", this.ui.wrap);
        	this.ui.txtEmail = this.getCidEl("email", this.ui.wrap);
        	this.ui.txtAddress = this.getCidEl("address", this.ui.wrap);
        	this.ui.file = this.getCidEl("file", this.ui.wrap);
        	this.ui.txtInput = this.ui.wrap.find("input[type='text']");

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

        showTip: function () {

        },

        hideTip: function () {

        },

        byName: function(name){
            return this.$el.find('[name=' + name + ']');
        },

        template: ['<div class="clearfix" id="<%-cid%>-content">',
			'<div class="windowBoxA_picture">',
				'<a href="javascript:void(0);" class="i_icoPicture">',
				'<input type="file" id="<%-cid%>-file" name="" class="" />',
				'</a>',
			'</div>',
			'<ul class="fromList fromListBox clearfix">',
				'<li>',
					'<label>姓名*</label>',
					'<input type="text" id="<%-cid%>-name" name="name" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>手机*</label>',
					'<input type="text" id="<%-cid%>-moblie" name="moblie" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>性别*</label>',
					'<input type="text"  id="<%-cid%>-sex" name="sex" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>政治面貌</label>',
					'<input type="text" id="<%-cid%>-political" name="political" class="input mt_5 fromListEm gray" placeholder="投往外企不建议填写政治面貌" />',
				'</li>',
				'<li>',
					'<label>年龄*</label>',
					'<input type="text" id="<%-cid%>-age" name="age" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>名族</label>',
					'<input type="text" id="<%-cid%>-nation" name="nation" class="input mt_5 fromListEm gray" placeholder="如投递企业有特殊需要否则不建议填写" />',
				'</li>',
				'<li>',
					'<label>邮箱*</label>',
					'<input type="text" id="<%-cid%>-email" name="email" class="input mt_5 fromListEm gray" placeholder="建议使用私人邮箱以便及时查收" />',
				'</li>',
				'<li>',
					'<label>所在地</label>',
					'<input type="text" id="<%-cid%>-address" name="address" class="input mt_5" />',
				'</li>',
			'</ul>',
		'</div>',
		'<p class="fromListBox_btn">',
			'<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM">保存</a>',
		'</p>'].join("\n")

    }));


})(WE, jQuery, Backbone);

