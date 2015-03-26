;(function (WE, jQuery, Backbone) {

    var superClass = WE.Resume.SuperClass;
    var _class = "WE.Resume.Data.Base";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                sort:1,
                isShow: true,
                isDrag: true,
                data: {
                    id: "",
                    i_sex: "1",
                    i_gov: "党员",
                    i_phone: "13926572774",
                    i_email: "13926572774@139.com",
                    i_name: "金锐",
                    i_address: "",
                    title: "",
                    job: "",
                    i_nat: "软件工程师",
                    i_photo: "http://www.jianlipro.com/aeroji.jpg"
                }
            };
        },

        KEY: "base",      

        initialize: function (args) {
            this.set({
                sort: args.sort,
                isShow: args.isShow,
                isDrag: args.isDrag
            });

            this.setData(args.data);
            this.master = args.master;         
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