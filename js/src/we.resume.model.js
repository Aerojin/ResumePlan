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
                mid: this.get("mid")
            };

            options.success = function (result) {
                this.set({data: result.data}, {silent: true});
                this.trigger("change:data");
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
                this.getResumeDetail();
                WE.UI.show("模版切换成功", { delay: 3000});
                if(callback){
                    callback([data]);
                }
            };

            options.error = function (result) {
                WE.UI.show(result.msg, {className: "msgRed", delay: 3000});
            };

            WE.Api.start(options, this);
        },

        /**
         * 构建表单请求
         * @param {Object} options 配置对象
         * @param {String} options.formName 表单名称
         * @param {String} options.iframeName iframe名称         
         * @param {String} options.url 请求地址
         * @param {String} options.data 数据
         */
        ajaxForm : function(options) {
            var doc = document, 
                body = doc.body, 
                form = doc.createElement("form"), 
                o = options, 
                data = options.data || {};

            form.name = o.formName;
            form.method = "post";
            form.action = o.url;

            if (!document.getElementById(o.iframeName)) {
                body.appendChild(createIframe(o.iframeName));
            }

            form.target = o.iframeName;
            
            for(var key in data){                
                form.appendChild(createInput(key, data[key]));
            }
            
            body.appendChild(form);
            form.submit();
            body.removeChild(form);

            function createInput(name, value) {
                var input = document.createElement("input");
                input.value = value;
                input.name = name;
                input.type = "hidden";
                return input;
            }

            function createIframe(name) {
                var iframe;
                try {
                    iframe = document.createElement('<iframe name="' + name + '"></iframe>');
                } catch (ex) {
                    iframe = document.createElement("iframe");
                    iframe.name = name;
                }
                iframe.id = name;
                iframe.style.display = "none";
                return iframe;
            }
        }

    }));


})(WE, jQuery, Backbone);