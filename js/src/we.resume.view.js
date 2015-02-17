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

            this.initSlideShow();
        },

        initEvents: function () {
            var _this = this;
            var ui = this.ui;


        },

        render: function () {
            this.ui = {};
            this.ui.main = $("#main");
            this.ui.wrapSlide = $("#wrap-slide");
            this.ui.btnLeft = $("#btn-left");
            this.ui.btnRight = $("#btn-right");
        },

        initSlideShow: function () {
            var options = {
                prev: this.ui.btnLeft,
                next: this.ui.btnRight,
                pageSize: 2,
                range: 157,
                parentElements: this.ui.wrapSlide,
                data: this.model.getTemplate()
            };


            this.slideShow = new WE.Resume.SlidesShow(options);

            this.slideShow.onChange = function (index) {

            };
        }

    }));

    $(function () {
        var model = new WE.Resume.Model();
        var view = new WE.Resume.View({model: model});
    });


})(WE, jQuery, Backbone);