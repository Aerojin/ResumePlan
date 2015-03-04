;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Menu.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
            	pageIndex: null,
            	pageCount: 4,
            	pageSize: 1,
    			education: {
    				key: "education",
    				text: "教育背景",
                    ico: "i_icoLock",
    				className: "i_icoMone",
    				isShow: true,
                    isLock: true,
                    width: 863
    			},
    			school: {
    				key: "school",
    				text: "校园经历",
                    ico: "i_icoLock",
    				className: "i_icoMtwo",
    				isShow: true,
                    isLock: true,
                    width: 863
    			},
    			work: {
    				key: "work",
    				text: "工作经历",
                    ico: "i_icoLock",
    				className: "i_icoMthree",
    				isShow: true,
                    isLock: true,
                    width: 978
    			},
    			skill: {
    				key: "skill",
    				text: "技能",
                    ico: "i_icoLock",
    				className: "i_icoMfour",
    				isShow: true,
                    isLock: true,
                    width: 665
    			},
    			prize: {
    				key: "prize",
    				text: "获奖经历",
                    ico: "i_icoLook",
    				className: "i_icoMfive",
    				isShow: true,
                    isLock: false,
                    width: 551
    			},
    			evaluation: {
    				key: "evaluation",
    				text: "自我评价",
                    ico: "i_icoLook",
    				className: "i_icoMtwo",
    				isShow: true,
                    isLock: false,
                    width: 338
    			},
    			research: {
    				key: "research",
    				text: "科研经历",
                    ico: "i_icoUnlook",
    				className: "i_icoMseven",
    				isShow: false,
                    isLock: false,
                    width: 863
    			},
    			article: {
    				key: "article",
    				text: "发表文章",
                    ico: "i_icoUnlook",
    				className: "i_icoMeight",
    				isShow: false,
                    isLock: false,
                    width: 551
    			},
    			subject: {
    				key: "subject",
    				text: "主修课程",
                    ico: "i_icoUnlook",
    				className: "i_icoMnine",
    				isShow: false,
                    isLock: false,
                    width: 338
    			},
    			hobbies: {
    				key: "hobbies",
    				text: "爱好",
                    ico: "i_icoLook",
    				className: "i_icoMten",
    				isShow: true,
                    isLock: false,
                    width: 338
    			},
    			exports: {
    				id: "btn-exports",
    				text: "导出",
                    ico: "",
    				className: "i_icoMeleven",
    				isShow: true
    			},
    			back: {
    				id: "btn-back",
    				text: "返回个人中心",
                    ico: "",
    				className: "i_icoMtwelve",
    				isShow: true
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
        	["education", "school", "work", "skill", "prize", "evaluation"],
        	["research", "article"],
        	["subject", "hobbies"],
        	["exports", "back"]
        ],

        initialize: function (options) {
        	this.model = options.model;

        	this.render();
        	this.initEvents();

        	this.model.set({pageIndex: 0});
        },

        initEvents: function () {
        	var _this = this;

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

        	this.ui.sidebar.delegate(".i_icoLook,.i_icoUnlook", "click", function () {
        		var options = {};
                var key = $(this).closest("li").data("key");

        		if(key){
        			options = _this.getOptions(key);
                    options[key].isShow = !options[key].isShow;
                    _this.model.set(options);

        			if(options[key].isShow){
        				$(this).closest("li").removeClass("not");
                        $(this).removeClass("i_icoUnlook").addClass("i_icoLook");
        			}else{
        				$(this).closest("li").addClass('not');
                        $(this).addClass("i_icoUnlook").removeClass("i_icoLook");
        			}
        		}

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
        	var page = this.page[pageIndex];
        	var template = _.template(this.template);


        	this.ui.sidebar.empty();


        	for(var i = 0; i < page.length; i++){
        		var options = this.model.get(page[i]);
        		var html = $(template(options));

        		if(!options.isShow){
        			html.addClass("not");
        		}

        		if(options.id){
        			html.attr({"id": options.id});
        		}

        		if(options.key){
        			html.data({key: options.key});
        		}

        		this.ui.sidebar.append(html);
        	}
        },

        getOptions: function (key) {
            var options = {};
                options[key] = this.model.get(key);

            return options;
        },

        template: [
        	'<li>',
				'<a href="javascript:void(0);">',
					'<i class="<%=className%>"></i>',
					'<p><%=text%></p>',
                    '<i class="<%-ico%>"></i>',
				'</a>',
			'</li>'
        ].join("\n")

    }));

	$(function () {
		var model = new WE.Resume.Menu.Model();
    	var view = new WE.Resume.Menu.View({model: model});
	});

})(WE, jQuery, Backbone);