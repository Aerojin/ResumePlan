;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.User.Center.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                date: new Date(),
                percent: 0,
            };
        },      

        initialize: function () {

        },

        initEvents: function () {

        }

    }));


})(WE, jQuery, Backbone);


;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.User.Center.View";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,

        template: "",

        initialize: function (options) {
            this.model = options.model;
            
            this.initEvents();
            this.render();
            this.initPageEvents();
        },

        initEvents: function () {
            var _this= this;

            this.model.on("change:percent", function () {
                var percent = this.get("percent");

                _this.ui.lblPercent.text(percent + "%");
                _this.ui.spanPercent.css({width: percent});
            });

            this.model.on("change:date", function () {
                var date = this.get("date");


            });
        },

        initPageEvents: function () {

        },

        render: function () {
            
            this.ui = {};
            this.ui.main = $("#main");
            this.ui.spanTime = this.ui.main.find("#span-time");
            this.ui.spanPercent = this.ui.main.find("#span-percent");
            this.ui.lblPercent = this.ui.main.find("#lbl-percent");
            this.ui.spanPercent = this.ui.main.find("#span-percent");
            
            
        }

    }));

    $(function () {
        var model = WE.User.Center.Model();
        var view = WE.User.Center.View({model: model});
    });


})(WE, jQuery, Backbone);