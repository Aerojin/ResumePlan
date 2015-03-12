;(function (WE, jQuery, Backbone) {

	var superClass = WE.View.ViewBase;
    var _class = "WE.Index.View";  

    WE.namespace(_class, superClass.extend({
    	
    	name: _class,

    	template: "",

        current: 0,

    	initialize: function (options) {
            this.model = options.model;

            this.render();
            this.initEvents();
            this.animation();
    	},

    	initEvents: function () {
            var _this = this;

            this.model.on("change:index", function () {
                var index = this.get("index");

                _this.showTab(index);
            });

            this.ui.document.scroll(function () {
                var scrollTop = $(this).scrollTop();
                var offset = _this.ui.main.offset();

                if(scrollTop > offset.top - 20){
                    _this.ui.headBar.addClass("headerTopFixed headerTop headerTopIndex").removeClass("headerBlack");
                }else{
                    _this.ui.headBar.removeClass("headerTopFixed  headerTop headerTopIndex").addClass("headerBlack");
                }
            });

            this.ui.tabButton.mouseenter(function () {
                var index = _this.ui.tabButton.index($(this));

                if(_this.interval){
                    clearInterval(_this.interval);
                }

                _this.model.set({index: index});
                setTimeout(function() {
                    _this.animation();
                },10);                    
            });

            this.ui.tabContent.hover(function () {
                if(_this.interval){
                    clearInterval(_this.interval);
                }
            }, function() {
                _this.animation();
            })
    	},

    	render: function () {
            this.ui = {};
            this.ui.main = $("#main");            
            this.ui.document = $(document);
            this.ui.headBar = $("#head-bar");
            this.ui.tabContent = $("#tab-content li");
            this.ui.tabButton = $("#tab-button li");
            
            
    	},
        showTab: function (index) {
            this.ui.tabButton.removeClass("focus");
            this.ui.tabButton.find(".i_icoTop").hide();
            this.ui.tabButton.eq(index).addClass("focus");
            this.ui.tabButton.eq(index).find(".i_icoTop").show();

            this.ui.tabContent.removeClass("on").hide();
            this.ui.tabContent.eq(index).addClass("on").fadeIn("slow");
        },
        animation: function () {
            var _this = this;

            this.interval = setInterval(function() {
                var index = _this.model.get("index") || 0;
                var max = _this.model.get("max") || 4;
                    index = index < max ? index + 1 : 0;

                _this.model.set({index: index});
            }, 5000);
        }

    }));

    $(function () {
        var model = new WE.Index.Model();
        var view  = new WE.Index.View({model: model});
    });

})(WE, jQuery, Backbone);