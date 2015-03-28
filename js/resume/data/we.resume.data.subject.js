;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Subject";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "subject",

        defaults: function () {
            return {
                data: []
            };
        }, 

        initialize: function (args) {
            this.master = args.master;
            superClass.prototype.initialize.apply(this, arguments);
        },

        create: function (args) {
            this.set({data: args});
        },

        update: function (args) {
            this.set({data: args});
        },

        getTableName: function () {
            return "InfoCourse";
        },

        format: function (args){
            return {
                id: args.id,
                context: args.context
            };
        }
    }));
})(WE, jQuery, Backbone);