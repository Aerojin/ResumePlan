;(function (WE, jQuery, Backbone) {

    var superClass = WE.View.ViewBase;
    var _class = "WE.Preview.View";

    WE.namespace(_class, superClass.extend({
        
        name: _class,


        initialize: function (options) {
            this.model = options.model;
            this.request = this.getRequest();

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
            this.ui.main = $("#main");

            this.model.getResumeDetail(this.request.m_id);
        },

        loadInstance: function (data) {
            this.instance = WE.Resume.getInstance({
                data: data,
                sort: data.sort,
                mid: this.request.m_id
            });
        },

        initControl: function (result) {
             new WE.Resume.Control.View({
                notDrag: true,
                type: result.cid,
                template: result.temp,
                instance: this.instance,
                container: this.ui.main
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

    $(function () {
        var model = new WE.Preview.Model();
        var view = new WE.Preview.View({
            model: model
        });
    });


})(WE, jQuery, Backbone);