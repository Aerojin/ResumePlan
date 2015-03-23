;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Ability";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "ability",

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

        format: function (args){
            return {
                id: args.id,
                name: args.name
            };
        }
    }));
})(WE, jQuery, Backbone);