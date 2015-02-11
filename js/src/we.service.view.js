;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Service.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function () {

            this.render();
            this.initEvents();
            this.slideShow();
        },

        initEvents: function () {
            var _this = this;

            this.ui.btnItem.click(function () {
                var index = _this.ui.btnItem.index($(this));
                _this.fade.gotoPage(index);
            });
        },

        render: function () {

            this.ui = {};
            this.ui.container = $('#container');
            this.ui.btnItem = $('#btn-item a');
        },
        slideShow: function () {
            var _this = this;

            this.fade = new WE.SlidesShow({
                time: 3000,
                parentElements: this.ui.container,
                elements: this.ui.container.find(".mod")
            });

            this.fade.onChange = function( index ){
                _this.ui.btnItem.removeClass('seld');
                _this.ui.btnItem.eq(index).addClass('seld');
            };

            this.fade.init();
        }

    }));

    $(function () {
        new WE.Service.View();
    });


})(WE, jQuery, Backbone);