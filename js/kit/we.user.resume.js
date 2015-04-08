;(function (WE, jQuery, Backbone) {

    var superClass = WE.Model.ModelBase;
    var _class = "WE.User.Resume.Model";  

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
                isPreview: 0
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


;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.User.Resume.View";

    WE.namespace(_class, superClass.extend({
        
        name: _class,


        initialize: function (options) {
            this.id = options.id;
            this.container = options.container;
            this.model = new WE.User.Resume.Model();

            this.initEvents();
            this.render();
        },

        initEvents: function () {
            var _this = this;

            this.model.on("change:data", function() {
                var data = this.get("data");
                var infoMain = data.InfoMain[0];

                _this.loadInstance(data);                
                _this.model.getTemplate(infoMain.tid);
            });

            this.model.on("change:template", function () {
                var template = this.get("template");

                _this.instance.set({templateType: template.cid});
                _this.initControl(template);
            });
        },

        render: function () {
            this.ui = {};
            this.ui.main = this.container;

            this.model.getResumeDetail(this.id);
        },

        loadInstance: function (data) {
            this.instance = WE.Resume.getInstance({
                data: data,
                sort: data.sort,
                mid: this.id,
                isNew: true,
            });
        },

        initControl: function (result) {
             new WE.Resume.Control.View({
                notDrag: true,
                type: result.cid,
                template: result.temp,
                instance: this.instance,
                container: this.ui.main,
                context: this.ui.main
            });
        },

        getRequest: function () {
           var url = location.search; //获取url中"?"符后的字串
           var theRequest = new Object();
           if (url.indexOf("?") != -1) {
              var str = url.substr(1);
              strs = str.split("&");
              for(var i = 0; i < strs.length; i ++) {
                 theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
              }
           }
           return theRequest || {};
        }

    }));
})(WE, jQuery, Backbone);