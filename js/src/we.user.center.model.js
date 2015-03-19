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
            var main = null;
            var data = [];

            _.each(data, function (e) {
                if(e.is_main){
                    main = e;
                }else{
                    data.push(e);
                }
            });

            if(!main && data.length > 0){
                main = data.splice(0,1);
            }

            this.model.set({
                main: main,
                data: data
            }, {silent: true});

            this.model.trigger("change:main");
            this.model.trigger("change:data");
        },

        getData: function () {
        	var array = [];
        	var data = this.get("data") || [];

        	_.each(data, function (e, index) {
        		array.push({
        			index: index,
        			direct: e.is_main,
                    id: e.id,
                    title: e.title,
                    image: e.i_url
        		})
        	});

        	return array;
        }

    }));

})(WE, jQuery, Backbone);