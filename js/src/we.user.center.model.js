;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.User.Center.Model";  

    WE.namespace(_class, superClass.extend({
        
        name: _class, 

        defaults: function () {
            return {
                main: null,
                data: null,
                date: new Date(),
                percent: 0
            };
        },

        TIPS: {
            CONFIRM_DELETE: "确定删除简历?",
            DELETE_SUCCESS: "删除成功!",
            MAIL_SUCCESS: "邮件发送成功!"
        },

        initialize: function () {

        },

        initEvents: function () {

        },

        getUserResume: function () {
            var options = {
                data: {}
            };

            options.success = function (result) {
                this.format(result.data);
            };

            options.error = function (result) {
                WE.UI.alert(result.msg);
            };

            WE.Api.getUserResume(options, this);
        },

        getNewResume: function (callback) {
            var options = {
                data: {
                    count: 1
                }
            };

            options.success = function (result) {
               if(callback){
                    callback(result.data);
               }
            };

            options.error = function (result) {

            };

            WE.Api.getNewResume(options, this);
        },

        getCollectResume: function (callback) {
            var options = {
                data: {}
            };

            options.success = function (result) {
                if(callback){
                    callback(result);
                }
            };

            options.error = function (result) {
                if(callback){
                    callback(result);
                }
            };

            WE.Api.getCollectResume(options, this);
        },

        sendMail: function (id, callback) {
            var options = {
                data: {
                    id: id
                }
            };

            options.success = function (result) {
                WE.UI.alert(this.TIPS.MAIL_SUCCESS);
            };

            options.error = function (result) {
                WE.UI.alert(result.msg);
            };

            WE.Api.sendMail(options, this);
        },

        download: function (id) {
            var options = {
                data: {
                    id: id
                }
            };

            options.success = function (result) {
                console.log("下载成功")
            };

            options.error = function (result) {
                WE.UI.alert(result.msg);
            };

            WE.Api.sendMail(options, this);
        },

        actionMain: function (args, callback) {
            var options = {
                data: {
                    id: args.id,
                    isMain: args.isMain
                }
            };

            options.success = function (result) {
                if(callback){
                    callback(args.isMain);
                }

                this.getUserResume();
            };

            options.error = function (result) {
                WE.UI.alert(result.msg);
            };

            WE.Api.actionMain(options, this);
        },

        removeResume: function (args, callback) {
        	var options = {
                data: {
                    id: args.id
                }
            };

            options.success = function (result) {
                if(callback){
                    callback();
                }

                this.getUserResume();
            };

            options.error = function (result) {
                WE.UI.alert(result.msg);
            };

            WE.Api.RemoveResume(options, this);

        },

        format: function (data) {
            //var main = null;
            var array = [];

            _.each(data, function (e, index) {
                e.index = index;
                e.image = e.i_url;
                e.direct = e.is_main;

                array.push(e);
            });

            /*
            if(!main && array.length > 0){
                main = array.splice(0,1);
            }*/


            this.model.set({data: array}, {silent: true});
            this.model.trigger("change:data");
            //this.model.trigger("change:main");
            
        },

        getData: function () {
        	var data = this.get("data") || [];
            var result = {
                main: null,
                data: []
            };

        	_.each(data, function (e, index) {
                if(e.is_main){
                    result.main = e;
                }else{
            		result.data.push(e);
                }
        	});

            if(!result.main && result.data.length > 0){                
                result.main = result.data.splice(0,1);
            }

        	return result;
        }

    }));

})(WE, jQuery, Backbone);