;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Pay.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function () {

            this.render();
            this.initEvents();
        },

        initEvents: function () {
            var _this = this;

            this.ui.menu.click(function () {
                var index = _this.ui.menu.index($(this));

                _this.ui.menu.removeClass("focus");
                _this.ui.menu.eq(index).addClass("focus");
                
                _this.ui.content.hide();
                _this.ui.content.eq(index).show();
            });
        },

        render: function () {
            this.ui = {};
            this.ui.menu = $("#menu li");
            this.ui.content = $("#content ul");
        }

    }));

    $(function () {
        new WE.Pay.View();
    });


})(WE, jQuery, Backbone);