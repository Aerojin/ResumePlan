;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.Preview.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
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
                id: tid,
                isPreview: 1
            };

            options.success = function (result) {
                this.set({template: result.data});
            };

            options.error = function (result) {
                WE.UI.show(result.msg, {className: "msgRed", delay: 3000});
            };

            WE.Api.getTemplate(options, this);
        }

    }));


})(WE, jQuery, Backbone);