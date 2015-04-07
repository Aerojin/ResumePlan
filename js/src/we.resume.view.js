;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        IFRAME_NAME: "{0}_iframe",

        initialize: function (options) {
            this.model = options.model;

            this.initEvents();
            this.render();
            this.initPageEvents();

            this.request = this.getRequest();
            this.model.getResumeDetail(this.request.m_id);
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

            this.model.on("change:data", function() {
                var data = this.get("data");
                var infoMain = data.InfoMain[0];
                
                _this.ui.title.text(infoMain.title);
                _this.model.getTemplate(infoMain.tid);
            });

            this.model.on("change:template", function () {
                var data = this.get("data");
                var template = this.get("template");

                _this.loadInstance(data);
                _this.instance.set({templateType: template.cid});
                _this.pageLoad(template);
            });

        },

        initPageEvents: function () {
            var _this = this;
            var ui = this.ui;

            ui.btnReplace.click(function () {
                var scroll = _this.model.get("scroll");

                $(document).scrollTop(0);
                _this.model.set({scroll: !scroll});
            });

            ui.btnExport2.click(function () {
                _this.exports();
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
            this.ui.title = $("#resume-title");
            this.ui.btnExport2 = $("#btn-export2");
            this.ui.exceed = $("#exceed");
        },

        initSlideShow: function () {
            var _this = this;
            var data = this.instance.getData("main");
            var options = {
                prev: this.ui.btnLeft,
                next: this.ui.btnRight,
                pageSize: 1,
                range: 157,
                parentElements: this.ui.wrapSlide
            };

            if(!this.slideShow){
                this.slideShow = new WE.Resume.SlidesShow(options);

                this.slideShow.onChange = function (id) {
                    var tid = parseInt(data.tid);

                    if(id != tid){
                        data.tid = id;
                        data.m_id = id;

                        _this.model.replaceTmplate(data, function (result) {
                            _this.instance.setData("main", result);
                        });
                    }
                };
            }
        },

        pageLoad: function (template) {
            this.initZoom();
            this.initMenu();
            this.initSlideShow();
            this.initControl(template);
        },

        loadInstance: function (data) {
            this.instance = WE.Resume.getInstance({
                mid: this.request.m_id,
                data: data,
                sort: data.sort,
                isNew: true
            });
        },

        initZoom: function () {
            if(!this.zoom){
                this.zoom = new WE.Resume.Zoom({
                    add: this.ui.btnAdd,
                    cut: this.ui.btnCut,
                    span: this.ui.span,
                    element: this.ui.resume
                });
            }
        },

        initMenu: function () {
            if(!this.menuView){
                this.menuView = new WE.Resume.Menu.View({
                    mid: this.request.m_id,
                    instance: this.instance
                });
            }
        },

        initControl: function (result) {

             new WE.Resume.Control.View({
                type: result.cid,
                container: this.ui.resume,
                context: this.ui.resume.find(".context"),
                template: result.temp,
                instance: this.instance,
                exceed: this.ui.exceed
            });
        },

        exports: function () {
            var id = this.request.m_id;
            var origin = location.origin;
            var api = "{0}/api.php?m=user&a=download".format(origin);
            var url = "{0}/preview.html?id={1}".format(window.location.origin, id);

            this.model.ajaxForm({
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