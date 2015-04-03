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
                    width: 818
                },
    			education: {
    				key: "education",
    				text: "教育背景",
    				className: "i_icoMone",
                    width: 863
    			},
    			school: {
    				key: "school",
    				text: "校园经历",
    				className: "i_icoMtwo",
                    width: 863
    			},
    			work: {
    				key: "work",
    				text: "工作经历",
    				className: "i_icoMthree",
                    width: 978
    			},
    			skill: {
    				key: "skill",
    				text: "技能",
    				className: "i_icoMfour",
                    width: 665
    			},
    			prize: {
    				key: "prize",
    				text: "获奖经历",
    				className: "i_icoMfive",
                    width: 551
    			},
    			evaluation: {
    				key: "evaluation",
    				text: "自我评价",
    				className: "i_icoMsix",
                    width: 338
    			},
    			research: {
    				key: "research",
    				text: "科研经历",
    				className: "i_icoMseven",
                    width: 863
    			},
    			article: {
    				key: "article",
    				text: "发表文章",
    				className: "i_icoMeight",
                    width: 551
    			},
    			subject: {
    				key: "subject",
    				text: "主修课程",
    				className: "i_icoMnine",
                    width: 338
    			},
    			hobbies: {
    				key: "hobbies",
    				text: "爱好",
    				className: "i_icoMten",
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
        
        IFRAME_NAME: "{0}_iframe",

        page: [
        	["base","education", "school", "work", "skill", "prize", "evaluation","research", "article"],
        	["subject", "hobbies"],
        	["exports", "back"]
        ],

        initialize: function (options) {

            this.mid = options.mid;
            this.instance = options.instance;
            this.model = new WE.Resume.Menu.Model();

        	this.render();
        	this.initEvents();

        	this.model.set({pageIndex: 0});
        },

        initEvents: function () {
        	var _this = this;

            this.instance.on("change:show", function (changed) {                
                var actionClass = changed.value ? "" : "not";
                var element = _this.ui.sidebar.find("#" + changed.key);
                var ico = changed.value ? "i_icoLookB" : "i_icoUnlook";

                element.removeClass("not").addClass(actionClass);
                element.find(".btn-ico").removeClass("i_icoLookB i_icoUnlook").addClass(ico);
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

            this.on("show", function (height) {
                if(!_this.topHeight){
                    _this.topHeight = height;
                }

                _this.ui.wrap.animate({top: height + 100});
            });

            this.on("scroll", function (offset) {
                var scrollTop = $(document).scrollTop();
                var top = _this.topHeight + 110 - scrollTop;
                    top = top < 100 ? 100 : top;

                _this.ui.wrap.animate({top: top});
                
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

            this.ui.sidebar.delegate("li.action", "click", function () {
                var key = $(this).data("key");
                var options = _this.getOptions(key);
                
                _this.showDialog(key, options[key]);
            });

        	this.ui.sidebar.delegate(".btn-ico", "click", function () {
                var key = $(this).closest("li").data("key");

                _this.instance.setShow(key);
                return false;
        	});

            this.ui.sidebar.delegate("li.action", "mouseenter", function () {
                $(this).find(".btn-hover").show();
            });

            this.ui.sidebar.delegate("li.action", "mouseleave", function () {
                $(this).find(".btn-hover").hide();
            });

        	this.ui.sidebar.delegate("#btn-back", "click", function () {
                window.location.href = "user_center.html";
        	});

        	this.ui.sidebar.delegate("#btn-exports", "click", function () {
        		_this.download();
        	});

            $(window).resize(function () {
                var maxWidth = $(document).width();
                var offset = _this.ui.parent.offset();
                var wrapWidth = _this.ui.wrap.width();
                var width = maxWidth - offset.left - wrapWidth - 815;
                
                _this.ui.wrap.css({right: width / 2}).show();
            });

            $(window).resize();
        },

        render: function () {

        	this.ui = {};
        	this.ui.sidebar = $("#sidebar");
        	this.ui.btnPrev = $("#btn-prev");
        	this.ui.btnNext = $("#btn-next");
            this.ui.wrap = $("#resume-menu");
            this.ui.parent = $("#resume").parent();
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
            var pageCount = this.page.length - 1;
        	var template = _.template(this.template);

        	for(var i = 0; i < page.length; i++){
                var config = _.clone(this.model.get(page[i]));
                var isShow = !!this.instance.getShow(config.key);
                var isLock = !!this.instance.getLock(config.key);

        		config = _.extend(config, {
                    id: config.key,
                    ico: this.getIcoHtml(config),
                    actionClass: isShow ? "" : "not"
                });

                if(_.isUndefined(isLock)){
                    config.actionClass = "";
                }

                if(pageIndex == pageCount){
                    config.actionClass= "on";
                }else{
                    config.actionClass = config.actionClass + " action"
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
            var template = _.template('<i class="<%-ico%> btn-hover" style="display:none;"></i>');

            return template({
                ico: this.getIcoClass(data)
            });
        },

        getIcoClass: function (data) {
            if(this.instance.getLock(data.key)){
                return "i_icoLock";
            }

            if(this.instance.getShow(data.key)){
                return "i_icoLookB btn-ico";
            }

            return "i_icoUnlook  btn-ico";
        },

        download: function () {
            var id = this.mid;
            var api = "http://www.jianlipro.com/api.php?m=user&a=download";
            var url = "{0}/preview.html?id={1}".format(window.location.origin, this.mid);

            this.ajaxForm({
                url: api,
                formName: this.IFRAME_NAME.format(this.cid),
                iframeName: this.IFRAME_NAME.format(this.cid),
                data: {
                   id: id,
                   url: url
                }
            });

            WE.UI.show("简历正在导出中...", {delay: 3000});
        },

        /**
         * 构建表单请求
         * @param {Object} options 配置对象
         * @param {String} options.formName 表单名称
         * @param {String} options.iframeName iframe名称         
         * @param {String} options.url 请求地址
         * @param {String} options.data 数据
         */
        ajaxForm : function(options) {
            var doc = document, 
                body = doc.body, 
                form = doc.createElement("form"), 
                o = options, 
                data = options.data || {};

            form.name = o.formName;
            form.method = "post";
            form.action = o.url;

            if (!document.getElementById(o.iframeName)) {
                body.appendChild(createIframe(o.iframeName));
            }

            form.target = o.iframeName;
            
            for(var key in data){                
                form.appendChild(createInput(key, data[key]));
            }
            
            body.appendChild(form);
            form.submit();
            body.removeChild(form);

            function createInput(name, value) {
                var input = document.createElement("input");
                input.value = value;
                input.name = name;
                input.type = "hidden";
                return input;
            }

            function createIframe(name) {
                var iframe;
                try {
                    iframe = document.createElement('<iframe name="' + name + '"></iframe>');
                } catch (ex) {
                    iframe = document.createElement("iframe");
                    iframe.name = name;
                }
                iframe.id = name;
                iframe.style.display = "none";
                return iframe;
            }
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

})(WE, jQuery, Backbone);