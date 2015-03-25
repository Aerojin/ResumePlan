;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;
            this.instance = options.instance;

            this.render();
            this.initEvents();

            this.initZoom();
            this.initMenu();
            this.initSlideShow();
            this.initControl();
            this.getResumeDetail();
            this.getTemplate();
            this.resumeSelect();
        },

        initEvents: function () {
            var _this = this;
            var ui = this.ui;

            /*
            this.constant.on("change", function () {
                _this.setItem(this.getChanged());
            });*/

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

            ui.infoBox.hover(function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
            });

            ui.infoBox.mousedown(function () {
               // $(this).addClass("focus").removeClass("hover");
            });

            ui.infoBox.mouseup(function () {
                //$(this).removeClass("focus");
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

        initControl: function () {
            new WE.Resume.Control.View({
                container: this.ui.resume,
                template: $("#resume-tmpl").html()
            });
        },

        getResumeDetail: function () {
            var options = {};
            var request = this.getRequest();

            options.data = {
                mid: request.m_id
            };

            options.success = function (result) {
                console.log(result);
            };

            options.error = function (result) {
                WE.UI.alert(result.msg, {type: "warn"});
            };

            WE.Api.getResumeDetail(options, this);

        },

        getTemplate: function () {
            var options = {};
            var request = this.getRequest();

            options.data = {
                id: request.t_id
            };

            options.success = function (result) {
                console.log(result);
            };

            options.error = function (result) {
                WE.UI.alert(result.msg, {type: "warn"});
            };

            WE.Api.getTemplate(options, this);
        },

        resumeSelect: function () {
            var options = {};
            var request = this.getRequest();

            options.data = {
                mid: request.m_id,
                module: "Info"
            };

            options.success = function (result) {
                console.log(result);
            };

            options.error = function (result) {
                WE.UI.alert(result.msg, {type: "warn"});
            };

            WE.Api.resumeSelect(options, this);
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
            model: model,
            instance: WE.Resume.getInstance()
        });
    });


})(WE, jQuery, Backbone);