;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Template";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                type: null
            };
        },

        TYPE: {
            FREE: 0,
            CHARGE: 1,
            TIME_LIMIT:2
        },

        initialize: function () {

        },

        initEvents: function () {

        }

    }));


})(WE, jQuery, Backbone);

;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Template";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function () {

        },

        initEvents: function () {

        },

        render: function () {

        }

    }));


    WE.namespace("WE.Template.Free", superClass.extend({
        
        name: "WE.Template.Free",

        template: "",

        initialize: function () {

        },

        initEvents: function () {

        },

        render: function () {

        }

    }));





})(WE, jQuery, Backbone);