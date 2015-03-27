;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Base";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                data: {
                    id: "",
                    i_sex: "",
                    i_gov: "",
                    i_phone: "",
                    i_email: "",
                    i_name: "",
                    i_address: "",
                    title: "",
                    job: "",
                    i_nat: "",
                    i_photo: ""
                }
            };
        },

        KEY: "base",      

        initialize: function (args) {
            this.master = args.master;
            superClass.prototype.initialize.apply(this, arguments);
        },

        create: function (data) {
            this.set({data: this.format(data)});
        },

        update: function (data) {
            this.set({data: this.format(data)});
        },

        remove: function (id) {

        },

        getData: function () {
            var data = _.clone(this.get("data"));
                //data.sex = WE.Constant.SEX[data.sex || "0"];

            return data;
        },

        getTableName: function () {
            return "Info";
        },

        format: function (args){
            return {
                id: args.id,
                i_sex: args.i_sex,
                i_gov: args.i_gov,
                i_phone: args.i_phone,
                i_email: args.i_email,
                i_name: args.i_name,
                title: args.title,
                job: args.job,
                i_nat: args.i_nat,
                i_photo: args.i_photo,
                i_address: args.i_address
            };
        }
    }));
})(WE, jQuery, Backbone);