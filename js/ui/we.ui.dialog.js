;(function (Backbone, jQuery, WE) {

	WE.namespace("WE.UI.Dialog", Backbone.View.extend({
		
	}));

})(Backbone, jQuery, WE);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ModelBase;
    var _class = "WE.UI.Dialog";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        el: "body",

        template: "",

        initialize: function (options) {
        	this.ui = options.ui;
        },

        initEvents: function () {
        	var _this = this;

        	
        },

        render: function () {

        }

    }));


})(WE, jQuery, Backbone);