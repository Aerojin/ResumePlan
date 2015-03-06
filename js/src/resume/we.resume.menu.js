;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Menu.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
            	pageIndex: null,
            	pageCount: 3,
            	pageSize: 1,
                base: {
                    key: "base",
                    text: "基本信息",
                    className: "i_icoInfo",
                    isLock: true,
                    width: 818
                },
    			education: {
    				key: "education",
    				text: "教育背景",
    				className: "i_icoMone",
                    isLock: true,
                    width: 863
    			},
    			school: {
    				key: "school",
    				text: "校园经历",
    				className: "i_icoMtwo",
                    isLock: true,
                    width: 863
    			},
    			work: {
    				key: "work",
    				text: "工作经历",
    				className: "i_icoMthree",
                    isLock: true,
                    width: 978
    			},
    			skill: {
    				key: "skill",
    				text: "技能",
    				className: "i_icoMfour",
                    isLock: true,
                    width: 665
    			},
    			prize: {
    				key: "prize",
    				text: "获奖经历",
    				className: "i_icoMfive",
                    isLock: false,
                    width: 551
    			},
    			evaluation: {
    				key: "evaluation",
    				text: "自我评价",
    				className: "i_icoMtwo",
                    isLock: false,
                    width: 338
    			},
    			research: {
    				key: "research",
    				text: "科研经历",
    				className: "i_icoMseven",
                    isLock: false,
                    width: 863
    			},
    			article: {
    				key: "article",
    				text: "发表文章",
    				className: "i_icoMeight",
                    isLock: false,
                    width: 551
    			},
    			subject: {
    				key: "subject",
    				text: "主修课程",
    				className: "i_icoMnine",
                    isLock: false,
                    width: 338
    			},
    			hobbies: {
    				key: "hobbies",
    				text: "爱好",
    				className: "i_icoMten",
                    isLock: false,
                    width: 338
    			},
    			exports: {
    				key: "btn-exports",
    				text: "导出",
    				className: "i_icoMeleven"
    			},
    			back: {
    				key: "btn-back",
    				text: "返回个人中心",
    				className: "i_icoMtwelve"
    			}
            };
        },      

        initialize: function () {

        },

        initEvents: function () {

        }

    }));
})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Menu.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        page: [
        	["base","education", "school", "work", "skill", "prize", "evaluation","research", "article"],
        	["subject", "hobbies"],
        	["exports", "back"]
        ],

        initialize: function (options) {
        	this.model = options.model;
            this.constant = options.constant;

        	this.render();
        	this.initEvents();

        	this.model.set({pageIndex: 0});
        },

        initEvents: function () {
        	var _this = this;

            this.constant.on("change", function () {
                var changed = this.getChanged();
                var actionClass = changed.value ? "" : "not";
                var element = _this.ui.sidebar.find("#" + changed.key);
                var ico = changed.value ? "i_icoLook" : "i_icoUnlook";

                element.removeClass("not").addClass(actionClass);
                element.find(".btn-ico").removeClass("i_icoLook i_icoUnlook").addClass(ico);
            });

        	this.model.on("change:pageIndex", function () {
        		var pageIndex = this.get("pageIndex");
        		var pageCount = this.get("pageCount");

        		if(pageIndex == 0){
	        		_this.ui.btnPrev.addClass('btnLa').removeClass("btnL");
	        	}else{
	        		_this.ui.btnPrev.removeClass('btnLa').addClass("btnL");
	        	}

	        	if(pageIndex == pageCount - 1){
	        		_this.ui.btnNext.addClass('btnLa').removeClass("btnL");
	        	}else{
	        		_this.ui.btnNext.removeClass('btnLa').addClass("btnL");
	        	}

        		_this.gotoPage(pageIndex);
        	});


        	this.ui.btnPrev.click(function () {
        		var pageIndex = _this.model.get("pageIndex") - 1;
        			pageIndex = pageIndex < 0 ? 0 :pageIndex;

        		_this.model.set({pageIndex: pageIndex});
        	});

        	this.ui.btnNext.click(function () {
        		var pageCount = _this.model.get("pageCount");
        		var pageIndex = _this.model.get("pageIndex") + 1;
        			pageIndex = pageIndex >= pageCount ? pageCount - 1 :pageIndex;

        		_this.model.set({pageIndex: pageIndex});
        	});

            this.ui.sidebar.delegate("li", "click", function () {
                var key = $(this).data("key");
                var options = _this.getOptions(key);
                
                _this.showDialog(key, options[key]);
            });

        	this.ui.sidebar.delegate(".btn-ico", "click", function () {
                var key = $(this).closest("li").data("key");

                _this.constant.setKey(key);
                return false;
        	});

        	this.ui.sidebar.delegate("#btn-back", "click", function () {

        	});

        	this.ui.sidebar.delegate("#btn-exports", "click", function () {
        		window.location.href = "user_center.html";
        	});
        },

        render: function () {

        	this.ui = {};
        	this.ui.sidebar = $("#sidebar");
        	this.ui.btnPrev = $("#btn-prev");
        	this.ui.btnNext = $("#btn-next");
        },

        showDialog: function (key, data) {

            switch(key){
                case "base":
                    this.dialog = new WE.Resume.Base.View(data);
                    break;
                case "education": 
                    this.dialog = new WE.Resume.Education.View(data);
                    break;
                case "school":
                    this.dialog = new WE.Resume.School.View(data);
                    break;
                case "work": 
                    this.dialog = new WE.Resume.Work.View(data);
                    break;
                case "skill": 
                    this.dialog = new WE.Resume.Skill.View(data);
                    break;
                case "prize": 
                    this.dialog = new WE.Resume.Prize.View(data);
                    break;
                case "evaluation": 
                    this.dialog = new WE.Resume.Evaluation.View(data);
                    break;
                case "research": 
                    this.dialog = new WE.Resume.Research.View(data);
                    break;
                case "article": 
                    this.dialog = new WE.Resume.Article.View(data);
                    break;
                case "subject": 
                    this.dialog = new WE.Resume.Subject.View(data);
                    break;
                case "hobbies": 
                    this.dialog = new WE.Resume.Hobbies.View(data);
                    break;
            }

        },

        gotoPage: function (pageIndex) {
            var html = []
        	var page = this.page[pageIndex];
        	var template = _.template(this.template);

        	for(var i = 0; i < page.length; i++){
                var config = _.clone(this.model.get(page[i]));
                var isShow = this.constant.getKey(config.key);

        		config = _.extend(config, {
                    id: config.key,
                    ico: this.getIcoHtml(config),
                    actionClass: isShow ? "" : "not"
                });

                if(_.isUndefined(config.isLock)){
                    config.actionClass = "";
                }

                html.push(template(config));
        	}

            this.ui.sidebar.html(html.join("\n"));
        },

        setAction: function (data) {

        },

        getOptions: function (key) {
            var options = {};
                options[key] = this.model.get(key);

            return options;
        },

        getIcoHtml: function (data) {
            if(_.isUndefined(data.isLock)){
                return "";
            }

            var template = _.template('<i class="<%-ico%>"></i>');

            return template({
                ico: this.getIcoClass(data)
            });
        },

        getIcoClass: function (data) {
            if(data.isLock){
                return "i_icoLock";
            }

            if(this.constant.getKey(data.key)){
                return "i_icoLook btn-ico";
            }

            return "i_icoUnlook  btn-ico";
        },

        template: [
        	'<li id="<%-id%>" data-key="<%-key%>" class="<%-actionClass%>">',
				'<a href="javascript:void(0);">',
					'<i class="<%=className%>"></i>',
					'<p><%=text%></p>',
                    '<%=ico%>',
				'</a>',
			'</li>'
        ].join("\n")

    }));

	$(function () {
		var model = new WE.Resume.Menu.Model();
    	var view = new WE.Resume.Menu.View({
            model: model,
            constant: WE.Resume.getConstant()
        });
	});

})(WE, jQuery, Backbone);