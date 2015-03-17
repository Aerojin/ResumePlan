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
                context: args.context
            };
        }
    }));
})(WE, jQuery, Backbone);