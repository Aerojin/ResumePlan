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
                    sex: "1",
                    political: "党员",
                    moblie: "13926572774",
                    email: "13926572774@139.com"
                    name: "金锐",
                    job: "软件工程师",
                    pinyin: "jinrui",
                    photo: "http://www.jianlipro.com/aeroji.jpg"
                }
            };
        },

        KEY: "base",      

        initialize: function (args) {
            this.model.set({
                sort: args.sort,
                isShow: args.isShow,
                isDrag: args.isDrag
            });

            this.setData();
            this.master = args.master;         
        },

        create: function (data) {
            this.model.set({data: this.format(data)});
        },

        update: function (data) {
            this.model.set({data: this.format(data)});
        },

        remove: function (id) {

        },

        format: function (args){
            return {
                sex: args.sex,
                political: args.political,
                moblie: args.moblie,
                email: args.email,
                name: args.name,
                job: args.job,
                pinyin: args.pinyin,
                photo: args.photo
            };
        }
    }));
})(WE, jQuery, Backbone);