;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Evaluation";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        KEY: "evaluation",

        defaults: function () {
            return {
                data: []
            };
        }, 

        initialize: function (args) {
            this.master = args.master;
            superClass.prototype.initialize.apply(this, arguments);
        },

        getData: function () {
            var data = this.get("data") || []; 

            if(data.length){
                data = data[data.length - 1];

                return _.clone(data);
            }

            return {};
        },

        getTableName: function () {
            return "InfoZwpingjia";
        },

        format: function (args){
            return {
                id: args.id,
                context: args.context
            };
        }
    }));
})(WE, jQuery, Backbone);