;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Prize";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "prize",

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
            return "InfoPrize";
        },

        format: function (args){
            return {
                id: args.id,
                name: args.name,
                jibie: args.jibie,
                dateY: args.dateY,
                dateM: args.dateM
            };
        }
    }));
})(WE, jQuery, Backbone);