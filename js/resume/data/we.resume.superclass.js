;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.SuperClass";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,    

        initialize: function () {

        },

        create: function (args) {
            var data = this.get("data") || [];

            data.push(this.format(args));

            this.set({data: data});
        },

        update: function (args) {
            var data = this.get("data");
            var index = _.findIndex(data, {id: args.id});

            data[index] = this.format(args);

            this.set({data: data});
        },

        remove: function (id) {
            var data = this.get("data");
            var index = _.findIndex(data, {id: args.id});

            data.splice(index, 1);

            this.set({data: data});
        },

        setData: function (data) {
            var _this = this;

            if(_.isArray(data)){
                _.each(data, function (e) {
                    _this.create(_this.format(e));
                });
            }else{
                _this.create(_this.format(data));
            }
        },

        getData: function () {
            return this.get("data");
        },

        setShow: function () {
            var isShow = this.get("isShow");

            this.set({isShow: !isShow});
            this.master.trigger("changeShow", {
                key: this.KEY,
                value: this.get("isShow")
            });
        },

        getShow: function () {
            return this.get("isShow");
        },

        getDrag: function () {
            return this.get("isDrag");
        },

        format: function (){
            return {};
        }

    }));


})(WE, jQuery, Backbone);