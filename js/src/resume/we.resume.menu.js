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
    				className: "i_icoMone",
    				isShow: true
    			},
    			school: {
    				key: "school",
    				text: "校园经历",
    				className: "i_icoMtwo",
    				isShow: true
    			},
    			work: {
    				key: "work",
    				text: "工作经历",
    				className: "i_icoMthree",
    				isShow: true
    			},
    			skill: {
    				key: "skill",
    				text: "技能",
    				className: "i_icoMfour",
    				isShow: true
    			},
    			prize: {
    				key: "prize",
    				text: "获奖经历",
    				className: "i_icoMfive",
    				isShow: true
    			},
    			evaluation: {
    				key: "evaluation",
    				text: "自我评价",
    				className: "i_icoMtwo",
    				isShow: true
    			},
    			research: {
    				key: "research",
    				text: "科研经历",
    				className: "i_icoMseven",
    				isShow: true
    			},
    			article: {
    				key: "article",
    				text: "发表文章",
    				className: "i_icoMeight",
    				isShow: true
    			},
    			subject: {
    				key: "subject",
    				text: "主修课程",
    				className: "i_icoMnine",
    				isShow: true
    			},
    			hobbies: {
    				key: "hobbies",
    				text: "爱好",
    				className: "i_icoMten",
    				isShow: true
    			},
    			exports: {
    				id: "btn-exports",
    				text: "导出",
    				className: "i_icoMeleven",
    				isShow: true
    			},
    			back: {
    				id: "btn-back",
    				text: "返回个人中心",
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
        		var options = {};


        		if(key){
        			options[key] = _this.model.get(key);
        			options[key].isShow = !options[key].isShow;
        			_this.model.set(options);

        			if(options[key].isShow){
        				$(this).removeClass("not");
        			}else{
        				$(this).addClass('not');
        			}
        		}
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

        template: [
        	'<li>',
				'<a href="javascript:void(0);">',
					'<i class="<%=className%>"></i>',
					'<p><%=text%></p>',
				'</a>',
			'</li>'
        ].join("\n")

    }));

	$(function () {
		var model = new WE.Resume.Menu.Model();
    	var view = new WE.Resume.Menu.View({model: model});
	});

})(WE, jQuery, Backbone);