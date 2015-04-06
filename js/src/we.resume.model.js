;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Resume.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                scroll: false,
                data: null,
                template: null
            };
        },      

        initialize: function () {

        },

        initEvents: function () {

        },

        getResumeDetail: function (mid, callback) {
            var options = {};

            options.data = {
                mid: mid
            };

            options.success = function (result) {
                this.set({data: result.data});
            };

            options.error = function (result) {
                WE.UI.show(result.msg, {className: "msgRed", delay: 3000});
            };

            WE.Api.getResumeDetail(options, this);

        },

        getTemplate: function (tid, callback) {
            var options = {};

            options.data = {
                id: tid
            };

            options.success = function (result) {
                this.set({template: result.data}, {silent: true});
                this.trigger("change:template");
            };

            options.error = function (result) {
                WE.UI.show(result.msg, {className: "msgRed", delay: 3000});
            };

            WE.Api.getTemplate(options, this);
        },

        replaceTmplate: function (data, callback) {
            var options = {};

            options.data = data;

            options.success = function (result) {
                this.getTemplate(data.tid);
                WE.UI.show("模版切换成功", { delay: 3000});
                if(callback){
                    callback([data]);
                }
            };

            options.error = function (result) {
                WE.UI.show(result.msg, {className: "msgRed", delay: 3000});
            };

            WE.Api.start(options, this);
        }

    }));


})(WE, jQuery, Backbone);