;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Base.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                id: null,
                i_name: null,
                i_sex: null,
                i_age: null,
                i_email: null,
                i_phone: null,
                i_gov: null,
                i_nat: null,
                i_address: null,
                i_photo: null
            };
        },

        TIPS: {
            NAME_EMPTY: "请输入姓名",
            SEX_EMPTY: "请输入性别",
            AGE_EMPTY: "请输入年龄",
            EMAIL_EMPTY: "请输入邮箱",
            MOBLIE_EMPTY: "请输入手机",
            EMAIL_ERROR: "邮箱格式错误",
            SAVE_SUCCESS: "保存成功",
            SAVE_FAIL: "保存失败"

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
            var key = 'i_name';
            if (_.has(data, key)) {
                if (!data.i_name || !data.i_name.length) {
                    return getResult(key, self.TIPS.NAME_EMPTY);
                }
            }

            //验证性别有效性
            var key = 'i_sex';
            if (_.has(data, key)) {
                if (!data.i_sex || !data.i_sex.length) {
                    return getResult(key, self.TIPS.SEX_EMPTY);
                }
            }

            //验证年龄有效性
            var key = 'i_age';
            if (_.has(data, key)) {
                if (!data.i_age || !data.i_age.length) {
                    return getResult(key, self.TIPS.AGE_EMPTY);
                }
            }

            //验证邮件有效性
            var key = 'i_email';
            if (_.has(data, key)) {
                if (!data.i_email || !data.i_email.length) {
                    return getResult(key, self.TIPS.EMAIL_EMPTY);
                }

                if(data.i_email && !self.isEmail.test(data.i_email)){
                    return getResult(key, self.TIPS.EMAIL_ERROR);   
                }
            }

            //验证手机有效性
            var key = 'i_phone';
            if (_.has(data, key)) {
                if (!data.i_phone || !data.i_phone.length) {
                    return getResult(key, self.TIPS.MOBLIE_EMPTY);
                }
            }
        }

    }));
})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.Dialog;
    var _class = "WE.Resume.Base.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {
            this.key = options.key;
            this.title = options.text;
            this.width = options.width;
        	this.model = new WE.Resume.Base.Model();

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
            var _this = this;
        	var template = _.template(this.template);
        		template = template({cid: this.cid});

        	this.el = $(template);
        	this.ui = {};
        	this.ui.wrap = this.el;
            this.ui.context = this.ui.wrap;
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
            this.ui.photo = this.getCidEl("photo", this.ui.wrap);
        	this.ui.txtInput = this.ui.wrap.find("input[type='text']");

            this.upload = new WE.Upload({
                image: this.ui.photo,
                upLoadFile:  this.ui.file,
                callback: function (data) {
                    _this.model.set({i_photo: data.photo});
                    _this.ui.photo.attr({src: data.photo}).show();
                }
            });

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

            WE.Api.baseInfo(options, this);
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

            if(data.i_photo && data.i_photo.length > 0){
                this.ui.photo.attr({src: data.i_photo}).show();
            }
        },


        onClose: function () {

        },

        template: ['<div class="clearfix" id="<%-cid%>-content">',
			'<div class="windowBoxA_picture">',
				'<a href="javascript:void(0);" class="i_icoPicture">',
                '<img src="" id="<%-cid%>-photo" style="display:none;">',
				'<input type="file" id="<%-cid%>-file" name="" class="" />',
				'</a>',
			'</div>',
			'<ul class="fromList fromListBox clearfix">',
				'<li>',
					'<label>姓名*</label>',
					'<input type="text" id="<%-cid%>-name" name="i_name" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>手机*</label>',
					'<input type="text" id="<%-cid%>-moblie" name="i_phone" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>性别*</label>',
					'<input type="text"  id="<%-cid%>-sex" name="i_sex" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>政治面貌</label>',
					'<input type="text" id="<%-cid%>-political" name="i_gov" class="input mt_5 fromListEm gray" placeholder="投往外企不建议填写政治面貌" />',
				'</li>',
				'<li>',
					'<label>年龄*</label>',
					'<input type="text" id="<%-cid%>-age" name="i_age" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>名族</label>',
					'<input type="text" id="<%-cid%>-nation" name="i_nat" class="input mt_5 fromListEm gray" placeholder="如投递企业有特殊需要否则不建议填写" />',
				'</li>',
				'<li>',
					'<label>邮箱*</label>',
					'<input type="text" id="<%-cid%>-email" name="i_email" class="input mt_5 fromListEm gray" placeholder="建议使用私人邮箱以便及时查收" />',
				'</li>',
				'<li>',
					'<label>所在地</label>',
					'<input type="text" id="<%-cid%>-address" name="i_address" class="input mt_5" />',
				'</li>',
			'</ul>',
		'</div>',
		'<p class="fromListBox_btn">',
			'<a href="javascript:void(0);" id="<%-cid%>-save" class="btnM">保存</a>',
		'</p>'].join("\n")

    }));


})(WE, jQuery, Backbone);

