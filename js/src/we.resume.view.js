;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;

            this.render();
            this.initEvents();

            this.initZoom();
            this.initSlideShow();
        },

        initEvents: function () {
            var _this = this;
            var ui = this.ui;

            ui.infoBox.hover(function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
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
        }

    }));

    $(function () {
        var model = new WE.Resume.Model();
        var view = new WE.Resume.View({model: model});
    });


})(WE, jQuery, Backbone);