;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;
            this.instance = options.instance;

            this.initEvents();
            this.render();
            this.initPageEvents();

            var args = this.getRequest();

            this.model.getTemplate(args.t_id);
            this.model.getResumeDetail(args.m_id);
        },

        initEvents: function () {
            var _this = this;
            this.model.on("change:scroll", function () {
                if(this.get("scroll")){
                    _this.ui.divScroll.show("fast", function () {
                        _this.menuView.trigger("show", $(this).height());
                    });
                }else{
                    _this.ui.divScroll.hide("fast");
                    _this.menuView.trigger("show", 0);
                }
            });

            this.model.on("change", function() {
                var data = this.get("data");
                var template = this.get("template");

                if(data && template){
                    _this.pageLoad(data, template);
                }
            });

        },

        initPageEvents: function () {
            var _this = this;
            var ui = this.ui;

            ui.infoBox.hover(function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
            });

            ui.btnReplace.click(function () {
                var scroll = _this.model.get("scroll");

                $(document).scrollTop(0);
                _this.model.set({scroll: !scroll});
            });

            $(document).scroll(function() {
                if(_this.model.get("scroll")){

                    if(_this.timer){
                        clearTimeout(_this.timer);
                    }

                    _this.timer = setTimeout(function () {
                        _this.menuView.trigger("scroll", _this.ui.main.offset());    
                    }, 50);
                }
            });
        },

        render: function () {
            this.ui = {};
            this.ui.main = $("#main");
            this.ui.wrapSlide = $("#wrap-slide");
            this.ui.btnLeft = $("#btn-left");
            this.ui.btnRight = $("#btn-right");
            this.ui.btnAdd = $("#btn-add");
            this.ui.btnCut = $("#btn-cut");
            this.ui.resume = $("#resume");
            this.ui.span = $("#span-text");
            this.ui.btnReplace = $("#btn-replace");
            this.ui.divScroll = $("#scroll");

            this.ui.infoBox = $(".infoBox");
        },

        initSlideShow: function () {
            var options = {
                prev: this.ui.btnLeft,
                next: this.ui.btnRight,
                pageSize: 1,
                range: 157,
                parentElements: this.ui.wrapSlide,
                data: this.model.getTemplate()
            };


            this.slideShow = new WE.Resume.SlidesShow(options);

            this.slideShow.onChange = function (index) {

            };
        },

        pageLoad: function (data, template) {
            this.instance = WE.Resume.getInstance({
                data: data,
                sort: data.sort,
                type: template.cid
            });

            this.initZoom();
            this.initMenu();
            this.initControl(template);
        },

        initZoom: function () {
            this.zoom = new WE.Resume.Zoom({
                add: this.ui.btnAdd,
                cut: this.ui.btnCut,
                span: this.ui.span,
                element: this.ui.resume
            });
        },

        initMenu: function () {
            this.menuView = new WE.Resume.Menu.View({
                instance: this.instance
            });
        },

        initControl: function (result) {

             new WE.Resume.Control.View({
                type: result.cid,
                container: this.ui.resume,
                template: result.temp,
                instance: this.instance
            });
        },

        getRequest: function () {
           var url = location.search; //获取url中"?"符后的字串
           var theRequest = new Object();
           if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              strs = str.split("&");
              for(var i = 0; i < strs.length; i ++) {
                 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
              }
           }
           return theRequest || {};
        }
    }));

    $(function () {
        var model = new WE.Resume.Model();
        var view = new WE.Resume.View({
            model: model
        });
    });


})(WE, jQuery, Backbone);