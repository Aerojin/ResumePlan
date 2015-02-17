;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                
            };
        },      

        initialize: function () {

        },

        initEvents: function () {

        },

        getTemplate: function () {
        	var list = [];

        	for(var i = 0; i < 20; i++){
        		var item = {
        			id: i,
        			type: Math.floor(Math.random() * 4),
        			image: "",
        			title: "river"
        		};

        		list.push(item);
        	}

        	return list;
        }

    }));


})(WE, jQuery, Backbone);