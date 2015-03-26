;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Hobbies";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "hobbies",

        defaults: function () {
            return {
                sort:1,
                isShow: true,
                isDrag: true,
                data: {}
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

        create: function (args) {
            this.set({data: this.format(args)});
        },

        update: function (args) {
            this.set({data: this.format(args)});
        },

        getTableName: function () {
            return "InfoAihao";
        },

        format: function (args){
            return {
                id: args.id,
                context: args.context
            };
        }
    }));
})(WE, jQuery, Backbone);