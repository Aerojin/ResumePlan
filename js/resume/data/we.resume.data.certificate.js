;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Certificate";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "certificate",

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
            return "InfoZhengshu";
        },

        format: function (args){
            return {
                id: args.id,
                name: args.name
            };
        }
    }));
})(WE, jQuery, Backbone);