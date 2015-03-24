;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Evaluation";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "evaluation",

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

        create: function (args) {
            this.set({data: this.format(args)});
        },

        update: function (args) {
            this.set({data: this.format(args)});
        },

        format: function (args){
            return {
                id: args.id,
                context: args.context
            };
        }
    }));
})(WE, jQuery, Backbone);