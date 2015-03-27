;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Project";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "project",

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
            return "InfoXiangmu";
        },

        format: function (args){
            return {
                id: args.id,
                name: args.name,
                position: args.position,
                startY: args.startY,
                startM: args.startM,
                endY: args.endY,
                endM: args.endM,
                context: args.context
            };
        }
    }));
})(WE, jQuery, Backbone);