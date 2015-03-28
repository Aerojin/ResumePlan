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

        create: function (data) {
            this.set({data: data});
        },

        update: function (data) {
            this.set({data: data});
        },

        remove: function (id) {

        },

        getData: function () {
            return _.clone(this.get("data"));
        },

        getTableName: function () {
            return "InfoMain";
        }

    }));
})(WE, jQuery, Backbone);