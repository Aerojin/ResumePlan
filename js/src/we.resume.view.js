;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;
            this.constant = options.constant;

            this.render();
            this.initEvents();

            this.initZoom();
            this.initDrog();
            this.initMenu();
            this.initSlideShow();
            this.initControl();
        },

        initEvents: function () {
            var _this = this;
            var ui = this.ui;

            this.constant.on("change", function () {
                _this.setItem(this.getChanged());
            });

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

            $("body").click(function (event) {
                console.log("event", event);
                console.log("pageX", event.pageX);
                console.log("pageY", event.pageY);
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

        initDrog: function () {
            var id = _.template("#drag-<%-id%>");
            var array = ["base","education", "school", "work", "skill", "prize", "evaluation","research", "article", "subject", "hobbies"];

            for(var i = 0; i < array.length; i++){
                var newId = id({id: array[i]});

                new WE.Drag({
                    dragClass: ".dragDiv",
                    dragTable: $("#dragTable"),
                    dragElement: $(newId),
                    moveElement: $(newId),
                    onMouseUp: function (element) {
                        element.css({cursor: "default"});
                        element.removeClass("focus");
                    },
                    onMouseDown: function (element) {
                        element.css({cursor: "move"});
                        element.addClass("focus").removeClass("hover");
                    }
                });

                this.setItem({
                    key: array[i],
                    value: this.constant.getKey(array[i])
                });
            }
        },

        initMenu: function () {
            this.menuView = new WE.Resume.Menu.View({
                constant: this.constant
            });
        },

        initControl: function () {
            new WE.Resume.Control.View({
                container: this.ui.resume,
                template: $("#resume-tmpl").html()
            });
        },

        

        setItem: function (data) {
            var id = _.template("#drag-<%-id%>");
                id = id({id: data.key});

            if(data.value){
                $(id).show();    
            }else{
                $(id).hide();
            }
        }

    }));

    $(function () {
        var model = new WE.Resume.Model();
        var view = new WE.Resume.View({
            model: model,
            constant: WE.Resume.getConstant()
        });
    });


})(WE, jQuery, Backbone);