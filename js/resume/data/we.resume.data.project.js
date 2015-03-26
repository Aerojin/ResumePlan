;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Project";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "project",

        defaults: function () {
            return {
                sort:1,
                isShow: true,
                isDrag: true,
                data: []
            };
        },      

        initialize: function (args) {
            this.set({
                sort: args.sort,
                isShow: args.isShow,
                isDrag: args.isDrag
            });

            this.setData(args.data);
            this.master = args.master;
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