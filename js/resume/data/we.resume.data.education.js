;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Education";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "education",

        defaults: function () {
            return {
                data: []
            };
        }, 

        initialize: function (args) {
            this.master = args.master;
            superClass.prototype.initialize.apply(this, arguments);
        },

        getTableName: function () {
            return "InfoJiaoyu";
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
                gpa: args.gpa,
                sort: args.sort
            };
        }
    }));
})(WE, jQuery, Backbone);