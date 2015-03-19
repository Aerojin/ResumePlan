;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Selected.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                type: "",
                money: "",
                pageIndex: 0,
                pageSize: 18,
                pageCount: 0,
                data: []
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
        },
        parse: function (data) {
            var array = [];

            _.each(data, function (e) {
                array.push({
                    id: e.id,
                    type: e.is_money,
                    title: e.name,
                    image: e.url,
                    time: e.external,
                    collect: e.iscollect,
                    lock: 0,
                    state: e.cid
                });
            });

            return array;
        },
        getDateDiff: function (date1, date2){
            var date3=date2.getTime() - date1.getTime()  //时间差的毫秒数

            //计算出相差天数
            return Math.floor(date3/(24*3600*1000))
        }



    }));


})(WE, jQuery, Backbone);