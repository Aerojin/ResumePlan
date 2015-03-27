;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Article";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "article",

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
            return "InfoArticle";
        },

        format: function (args){
            return {
                id: args.id,
                name: args.name,
                title: args.title,
                dateY: args.dateY,
                dateM: args.dateM
            };
        }
    }));
})(WE, jQuery, Backbone);