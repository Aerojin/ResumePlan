;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Education";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "education",

        defaults: function () {
            return {
                sort:1,
                isShow: true,
                isDrag: true,
                data: []
            };
        }, 

        initialize: function (args) {
            this.model.set({
                sort: args.sort,
                isShow: args.isShow,
                isDrag: args.isDrag
            });

            this.setData();
            this.master = args.master;
        },

        format: function (args){
            return {
                id: args.id,
                academic: args.academic,
                name: args.name,
                professional: args.professional,
                startY: args.startY,
                startM: args.startM,
                endY: args.endY,
                endM: args.endM,
                gpa: args.gpa
            };
        }
    }));
})(WE, jQuery, Backbone);