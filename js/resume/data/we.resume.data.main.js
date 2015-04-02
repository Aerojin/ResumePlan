;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Main";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                data: {
                    m_id: "",
                    name: "",
                    title: "",
                    language: ""
                }
            };
        },

        KEY: "main",      

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
            return "InfoMain";
        }

    }));
})(WE, jQuery, Backbone);