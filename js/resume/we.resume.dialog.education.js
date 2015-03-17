;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Education.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
            	state: null,
            	id: null,
                academic: null,
                graduate: null,
                name: null,
                gpa: null,
                sort: null,
                professional: null,
                entrance: null,
                list: []
            };
        },

        TIPS: {
            ACADEMIC_EMPTY: "学位不能为空",
            GRADUATE_EMPTY: "毕业时间不能为空",
            NAME_EMPTY: "学校名称不能为空",
            GPA_EMPTY: "GPA不能为空",
            SORT_EMPTY: "专业排名不能为空",
            PROFESSIONAL_ERROR: "专业不能为空",
          	ENTRANCE_EMPTY: "入学时间不能为空"

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
    var _class = "WE.Resume.Education.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,


        STATE: {
        	ADD: "add",
        	UPDATE: "update"
        },

        initialize: function (options) {

            this.options = options;
        	this.model = new WE.Resume.Education.Model();
        	this.collection = new Backbone.Collection();

        	this.initEvents()
        	this.render();
        	this.initPageEvents();
        },

        initEvents: function () {
        	var _this = this;

        	 this.collection.on("add", function () {
        	 	_this.renderMenu();
        	 });

        	 this.collection.on("change", function () {
        	 	_this.renderMenu();
        	 });

        	 this.collection.on("remove", function () {
        	 	_this.renderMenu();
        	 });

        	 this.model.on("change:state", function () {
        	 	var state = this.get("state");
        	 	var cid = this.get("id");

        	 	_this[state].render.call(_this, _this.collection.get(cid));
        	 });
        },

        initPageEvents: function () {
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

            this.ui.btnSave.click(function () {
            	var state = _this.model.get("state") || _this.STATE.ADD;

            	_this[state].update.call(_this);
            });

            this.ui.menu.delegate(".close", "click", function () {
            	var id = $(this).data("id");

            	_this.collection.remove(id);
            });

            this.ui.menu.delegate("li", "mouseenter", function () {
            	$(this).addClass('hover');
            });

            this.ui.menu.delegate("li", "mouseleave", function () {
            	$(this).removeClass('hover');
            });

            this.ui.menu.delegate("li", "click", function () {
            	_this.ui.menu.find("li").removeClass('focus');
            	$(this).addClass('focus');

            	_this.model.set({id: $(this).data("id")});
            	_this.model.set({state: _this.STATE.UPDATE});
            	_this.model.trigger('change:state')
            });
        },

        render: function () {
        	var template = _.template(this.template);
        		template = template({cid: this.cid});

        	this.el = $(template);
        	this.ui = {};
        	this.ui.wrap = this.el;
        	this.ui.btnSave = this.getCidEl("save", this.ui.wrap);
        	this.ui.graduate = this.getCidEl("graduate", this.ui.wrap);
        	this.ui.entrance = this.getCidEl("entrance", this.ui.wrap);
        	this.ui.txtAcademic = this.getCidEl("academic", this.ui.wrap);
        	this.ui.txtName = this.getCidEl("name", this.ui.wrap);
        	this.ui.txtGpa = this.getCidEl("gpa", this.ui.wrap);
        	this.ui.txtSort = this.getCidEl("sort", this.ui.wrap);
        	this.ui.txtProfessional = this.getCidEl("professional", this.ui.wrap);
        	this.ui.txtInput = this.ui.wrap.find("input[type='text']");
        	this.ui.menu = this.getCidEl("menu", this.ui.wrap);


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

        	this.graduate = new WE.Resume.Date({
        		container: this.ui.graduate,
        		onChange: function (data) {
        			_this.model.set({graduate: data});
        		} 
        	});

        	this.entrance = new WE.Resume.Date({
        		container: this.ui.entrance,
        		onChange: function (data) {
        			_this.model.set({entrance: data});
        		} 
        	});

        },

        add: function () {
        	var options = {
        		id: new Date().getTime(),
        		academic: this.ui.txtAcademic.val(),
        		graduate: this.graduate.getData(),
        		entrance: this.entrance.getData(),
        		name: this.ui.txtName.val(),
        		gpa: this.ui.txtGpa.val(),
        		sort: this.ui.txtSort.val(),
        		professional: this.ui.txtProfessional.val()
        	}

		    this.collection.add(options);
        },

        renderMenu: function () {
        	var html = [];
        	var len = this.collection.length;
        	var array = this.collection.toArray();
        	var template = _.template(this.listTmpl);

        	for(var i = 0; i < len; i++){
        		html.push(template({
        			id: array[i].cid,
        			num: i + 1,
        			title: array[i].get("name")
        		}));
        	}

        	this.ui.menu.html(html.join("\n"));
        },

        showTip: function () {

        },

        hideTip: function () {

        },

        byName: function(name){
            return this.$el.find('[name=' + name + ']');
        },

        add: {
        	render: function () {

        	},
        	update: function () {
        		var options = {
	        		id: new Date().getTime(),
	        		academic: this.ui.txtAcademic.val(),
	        		graduate: this.graduate.getData(),
	        		entrance: this.entrance.getData(),
	        		name: this.ui.txtName.val(),
	        		gpa: this.ui.txtGpa.val(),
	        		sort: this.ui.txtSort.val(),
	        		professional: this.ui.txtProfessional.val()
	        	}

			    this.collection.add(options);
        	}
        },

        update: {
        	render: function (model) {
        		this.ui.txtGpa.val(model.get("gpa"));
        		this.ui.txtName.val(model.get("name"));
        		this.ui.txtSort.val(model.get("sort"));
        		this.ui.txtAcademic.val(model.get("academic"));
        		this.ui.txtProfessional.val(model.get("professional"));

        		this.graduate.setData(model.get("graduate"));
        		this.entrance.setData(model.get("entrance"));
        	},
        	update: function () {
        		var cid = this.model.get("id");
        		var model = this.collection.get(cid);

        		model.set({
        			academic: this.ui.txtAcademic.val(),
	        		graduate: this.graduate.getData(),
	        		entrance: this.entrance.getData(),
	        		name: this.ui.txtName.val(),
	        		gpa: this.ui.txtGpa.val(),
	        		sort: this.ui.txtSort.val(),
	        		professional: this.ui.txtProfessional.val()
        		});

        		this.model.set({state: this.STATE.ADD});
        	}	
        },

        template: ['<div class="clearfix">',
		'<div class="windowBoxA_from_one">',
			'<ul class="fromList fromListBox clearfix">',
				'<li>',
					'<label>学位*</label>',
					'<input type="text" name="academic" id="<%-cid%>-academic" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>毕业*</label>',
					'<div class="clearfix mt_5" id="<%-cid%>-graduate">',
					'</div>',
				'</li>',
				'<li>',
					'<label>学校名称*</label>',
					'<input type="text" name="name" id="<%-cid%>-name" class="input mt_5" />',
				'</li>',
				'<li>',
					'<label>GPA*</label>',
					'<div class="clearfix mt_5">',
						'<select name="gpa" id="<%-cid%>-gpa" class="select gray" style="width:134px">',
							'<option value="1">2.5/4.1</option>',
							'<option value="2">2.5/4.2</option>',
							'<option value="3">2.5/4.3</option>',
						'</select>',
					'</div>',
				'</li>',
				'<li>',
					'<label>专业排名*</label>',
					'<input type="text" name="sort" id="<%-cid%>-sort" class="input mt_5" style="width:120px;" />',
				'</li>',
				'<li>',
					'<label>专业*</label>',
					'<input type="text" name="professional" id="<%-cid%>-professional" class="input mt_5" />',
				'</li>',
				'<li class="fromList_no"></li>',
				'<li>',
					'<label>入学*</label>',
					'<div class="clearfix mt_5" id="<%-cid%>-entrance">',
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

