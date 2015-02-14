;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Selected.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                
            };
        },      

        initialize: function () {

        },

        initEvents: function () {

        },
        getSingle: function () {
            var list = [];

            for(var i = 0; i < 30; i++){
                var item = {
                    type: Math.floor(Math.random() * 3),
                    title: "简历计划",
                    image: "../images/pic_01.jpg",
                    time: i + Math.floor(Math.random() * 4),
                    collect: !!(i % 2),
                    lock: !!(i % 5),
                    state: i % 2
                };

                list.push(item);
            }

            return list;

        },
        getDouble: function () {
            var list = [];

            for(var i = 0; i < 10; i++){
                var item = {
                    type: Math.floor(Math.random() * 3),
                    title: "简历计划",
                    image: "../images/pic_01.jpg",
                    time: i + Math.floor(Math.random() * 4),
                    collect: !!(i % 2),
                    lock: !!(i % 5)
                };

                list.push(item);
            }

            return list;
        }



    }));


})(WE, jQuery, Backbone);