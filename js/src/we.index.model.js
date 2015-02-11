;(function (WE, jQuery, Backbone) {

	var superClass = WE.Model.ModelBase;
    var _class = "WE.Index.Model";  

    WE.namespace(_class, superClass.extend({
    	
    	name: _class,

        defaults: function () {
            return {
                index: 0, //轮播当前页
                max: 4 //轮播总数
            };
        },    	

    	initialize: function () {

    	},

    	initEvents: function () {

    	}

    }));


})(WE, jQuery, Backbone);