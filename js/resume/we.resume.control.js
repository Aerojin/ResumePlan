;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Resume.Control.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        initialize: function (options) {
            
            this.template = options.template;
            this.container = options.container;
            this.instance = WE.Resume.getInstance();

        },

        initEvents: function () {

        },

        render: function () {

        }

    }));


})(WE, jQuery, Backbone);