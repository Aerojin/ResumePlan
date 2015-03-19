;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Template.Time";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: ['<li id="<%-cid%>-item">',
        			'<h2><%-state%></h2>',
                    '<div class="templateLi hover-info">',
                        '<img src="<%-image%>" alt="" title="" />',
                        '<span class="blackBg hover background" style="display:none;"></span>',
                        '<a href="javascript:void(0);" class="i_icoAdd hover btn-add" style="display:none;"></a>',
                        '<a href="javascript:void(0);" class="btnCollect hover btn-collect" style="display:none;">',
                        	'<%=collect%>',
                        '</a>',
                        '<span class="templateTimeBg"></span>',
						'<p class="templateTime">限时免费-还剩<%-time%>天</p>',
                    '</div>',
                    '<p class="templateP"><%-title%></p>',
                '</li>'].join("\n"),
         collect: false,       

        initialize: function (options) {

            this.id = options.id;
        	this.time = options.time;
        	this.title = options.title;
        	this.image = options.image;
        	this.state = options.state;
        	this.collect = options.collect;

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.wrap.hover(function () {
                _this.ui.hover.fadeIn("slow");;
            }, function () {
                _this.ui.hover.fadeOut("slow");
            });

            this.ui.btnUnlock.click(function () {
                window.location.href = "/start.html?m_id=" + _this.id;
            });

            this.ui.btnCollect.click(function () {
                _this.setCollect();
            });
        },

        render: function () {
            var template = _.template(this.template);
                template = template({
                    cid: this.cid,
                    image: this.image,
                    title: this.title,
                    time: this.getDateDiff(this.time),
                    state:  this.getSate(),
                    collect: this.getCollect()
                });

            this.ui = {};
            this.ui.wrap = $(template);
            this.ui.hover = this.ui.wrap.find(".hover");
            this.ui.btnUnlock = this.ui.wrap.find(".btn-unlock");
            this.ui.btnCollect = this.ui.wrap.find(".btn-collect");
            this.ui.background = this.ui.wrap.find(".background");
        },

        getSate: function () {
        	if(this.state % 2){
        		return "单栏";
        	}

        	return "双栏";
        },

        setCollect: function () {
            var options= {};
            var collect = !!this.collect ? 0 : 1;

            options.data = {
                id: this.id,
                collect: collect
            };

            options.success = function (result) {
                this.collect = collect;
                this.ui.btnCollect.html(this.getCollect());
            };

            options.error = function (result) {
                WE.UI.alert(result.msg, {type: "warn"});
            };

            WE.Api.actionCollect(options, this);
        },

        getCollect: function () {
        	if(this.collect){
                return '<i class="i_icoStarA"></i>取消';
            }

            return '<i class="i_icoStarB"></i>收藏';
            
        },

        getElement: function  (argument) {
            return this.ui.wrap;
        },

        getDateDiff: function (date){
            var date3= new Date(date).getTime() - new Date().getTime()  //时间差的毫秒数

            //计算出相差天数
            return Math.floor(date3/(24*3600*1000))
        }


    }));

})(WE, jQuery, Backbone);