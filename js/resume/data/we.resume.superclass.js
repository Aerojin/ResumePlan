;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.SuperClass";  

    WE.namespace(_class, superClass.extend({
        
        name: _class,    

        initialize: function (args) {
            this.set({mid: args.mid});
            this.setData(args.data[this.getTableName()]);
        },

        create: function (args) {
            var data = this.get("data") || [];

            data.push(args);

            this.set({data: data});
        },

        update: function (args) {
            var data = this.get("data");
            var index = _.findIndex(data, {id: args.id});

            data[index] = args;

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

            this.set({data: []});
            
            if(!data){
                return;
            }

            if(_.isArray(data)){
                _.each(data, function (e) {
                    _this.create(e);
                });
            }else{
                _this.create(data);
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

        reset: function (callback) {
            var options = {};

            options.data = {
                id: this.get("mid") || "6",
                table: this.getTableName()
            };

            options.success = function (result) {
                WE.UI.hide();
                this.setData(result.data.list);

                if(callback){
                    callback(this.getData());
                }
            };

            options.error = function (result) {
                WE.UI.show(result.msg, {className: "msgRed", delay: 2000});
            }; 

            WE.UI.show("数据加载中...");
            WE.Api.resumeSelect(options, this);
        },

        remove: function (id, callback) {
            if(this.isRemove()){
                WE.UI.show("该栏目必须要保留一条记录", {className: "msgRed", delay: 3000});
                return;
            }

            var options = {
                data: {
                    id: id,
                    table: this.getTableName()
                }
            };

            options.success = function (result) {
                this.reset(callback);
                WE.UI.show("删除成功", {delay: 2000});
            };

            options.error = function (result) {
                WE.UI.show(result.msg, {className: "msgRed", delay: 2000});
            }; 

            WE.Api.resumeRemove(options, this);
        },

        isRemove: function () {
            var data = this.get("data");
            var config = this.master.getModuleByKey(this.KEY);

            return config.lock && data.length == 1;
        },

        format: function (){
            return {};
        }

    }));


})(WE, jQuery, Backbone);