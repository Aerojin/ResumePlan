;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Control.Model";

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
               base: {
                    sort: 1,
                    isShow: true,
                    isDrag: true,
                    sex: 1,                    
                    political: "",
                    pinyin: "",
                    moblie: "",
                    name: "",
                    job: "",
                    photo: ""
               },
            };

            SEX: ["保密", "男", "女"]
        },      

        initialize: function () {
           

        },

        initEvents: function () {

        }

    }));


})(WE, jQuery, Backbone);